import React, { useEffect, useState } from "react";
import {
  View,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Text,
  TextInput,
} from "react-native";
import { Entypo, Feather } from "@expo/vector-icons";
import colors from "../../../../../constants/colors";
import { hostUrl } from "../../../../../services/index";
import axios from "axios";

const AllCategories = ({ isVisible, setIsVisible, navigation }) => {
  const { height } = Dimensions.get("window");
  const modalHeight = height * 0.5;

  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${hostUrl}/mazdoor/v1/getAllServices`)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.error("There was an error making the request:", error);
      });
  }, []);

  const filteredData = data.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setIsVisible(false)}
        />
        <ScrollView style={[styles.modalContent, { height: modalHeight }]}>
          <View>
            <View style={styles.scrollContent}>
              <View>
                <View style={styles.header}>
                  <Text style={styles.headerText}>All Categories</Text>
                  <TouchableOpacity
                    onPress={() => setIsVisible(false)}
                    style={styles.closeButton}
                  >
                    <Entypo name="cross" size={20} color={colors.danger} />
                  </TouchableOpacity>
                </View>
                <View style={styles.searchContainer}>
                  <Feather
                    name="search"
                    size={24}
                    color={colors.primary}
                    style={styles.searchIcon}
                  />
                  <TextInput
                    style={styles.searchInput}
                    placeholder="Search categories..."
                    value={searchQuery}
                    onChangeText={(text) => setSearchQuery(text)}
                  />
                </View>
                <View style={styles.itemsContainer}>
                  {filteredData.map((item, index) => (
                    <TouchableOpacity
                      onPress={() => {
                        navigation.push("CategoryDetail", {
                          label: item.label,
                          subCategory: item.sub_category,
                        });
                        setIsVisible(false);
                      }}
                      key={index}
                      style={styles.itemContainer}
                    >
                      <Text style={styles.itemText}>{item.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

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
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    borderTopWidth: 0.5,
    borderTopColor: "lightgray",
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  searchContainer: {
    marginTop: 20,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    elevation: 2,
    marginHorizontal: 5,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    color: "#505050",
  },
  headerText: {
    fontSize: 18,
    color: "#505050",
  },
  closeButton: {
    backgroundColor: colors.dangerBackground,
    padding: 5,
    borderRadius: 50,
  },
  itemsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  itemContainer: {
    width: "48%",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 7,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  itemText: {
    fontSize: 16,
    fontWeight: "400",
    color: colors.baseColor,
  },
});

export default AllCategories;
