import React, { useState } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import colors from "../../constants/colors";
import DropdownTextInput from "../DropdownTextInput";
import { useSystemStore } from "../../zustand/systemStore";

const Filter = ({
  isFilterVisible,
  setIsFilterVisible,
  filterLocation,
  filterExactLocation,
  setFilterExactLocation,
  setFilterLocation,
}) => {
  const { locations } = useSystemStore();

  // Temporary state for holding the selected values
  const [tempLocation, setTempLocation] = useState(filterLocation);
  const [tempExactLocation, setTempExactLocation] =
    useState(filterExactLocation);

  // State for managing the loading spinner
  const [loading, setLoading] = useState(false);

  const handleLocationChange = (location) => {
    setTempLocation(location);
    setTempExactLocation({ locality: location, exact: "All" });
  };

  const handleExactLocationChange = (exactLocation) => {
    setTempExactLocation((prevState) => ({
      ...prevState,
      exact: exactLocation,
    }));
  };

  const applyFilters = () => {
    setLoading(true);
    setFilterLocation(tempLocation);
    setFilterExactLocation(tempExactLocation);
    setTimeout(() => {
      setLoading(false);
      setIsFilterVisible(false);
    }, 1000);
  };

  const getExactLocationList = () => {
    const exactLocations = locations[tempLocation] || [];
    return ["All", ...exactLocations];
  };

  return (
    <Modal visible={isFilterVisible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setIsFilterVisible(false)}
        />
        <View style={styles.modalContent}>
          <View style={{ alignItems: "center" }}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Filter Location</Text>
              <TouchableOpacity
                onPress={() => setIsFilterVisible(false)}
                style={styles.closeButton}
              >
                <Entypo name="cross" size={20} color={colors.danger} />
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView>
            <View
              style={{
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: "95%",
                }}
              >
                <Text style={styles.label}>Search by locality</Text>
                <DropdownTextInput
                  iconName="map"
                  iconType="Ionicons"
                  placeholder="Select Locality"
                  list={Object.keys(locations)}
                  value={tempLocation}
                  onChangeText={handleLocationChange}
                />
                <Text style={styles.label}>Search by Exact Location</Text>
                <DropdownTextInput
                  iconName="location-outline"
                  iconType="Ionicons"
                  placeholder="Exact Location"
                  list={getExactLocationList()}
                  value={tempExactLocation.exact}
                  onChangeText={handleExactLocationChange}
                />
              </View>
            </View>
          </ScrollView>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.applyButton}
              onPress={applyFilters}
              disabled={loading} // Disable the button while loading
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.applyButtonText}>Apply Filters</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    height: height * 0.6,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    overflow: "hidden",
    borderTopWidth: 0.5,
    borderTopColor: "lightgray",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "95%",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    color: "gray",
  },
  closeButton: {
    backgroundColor: colors.dangerBackground,
    padding: 5,
    borderRadius: 50,
  },
  label: {
    paddingVertical: 5,
    color: "gray",
    fontWeight: "300",
  },
  buttonContainer: {
    alignItems: "center",
    padding: 10,
  },
  applyButton: {
    backgroundColor: colors.primary,
    width: "95%",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 10,
    elevation: 5,
  },
  applyButtonText: {
    fontSize: 16,
    color: "white",
  },
});

export default Filter;
