import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import styles from "./styles";

const DropdownTextInput = ({
  iconName,
  iconType,
  placeholder,
  value,
  onChangeText,
}) => {
  const [selected, setSelected] = useState(value || placeholder);
  const [isClicked, setIsClicked] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDistrictData();
  }, []);

  const fetchDistrictData = async () => {
    try {
      const response = await fetch(
        "https://digimazdoor.tech/mazdoor/v1/getLocationData"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      const districtNames = Object.keys(data); // Extracting district names
      setDistricts(districtNames);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching district data:", error);
      setIsLoading(false);
    }
  };

  const handleSelect = (district) => {
    setSelected(district);
    setIsClicked(false);
    onChangeText(district); // Call the parent component's onChangeText handler
  };

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={() => setIsClicked(!isClicked)}
        style={styles.dropdownButton}
      >
        <View style={styles.dropdownButtonContent}>
          {iconType === "Ionicons" && (
            <FontAwesome
              name="map-o"
              size={14}
              color="lightgray"
              style={styles.icon}
            />
          )}
          <Text
            style={[
              styles.dropdownText,
              selected === placeholder
                ? { color: "#D0D0D0" }
                : { color: colors.baseColor },
            ]}
          >
            {selected}
          </Text>
        </View>
        {isClicked ? (
          <Entypo name="chevron-small-up" size={24} color="gray" />
        ) : (
          <Entypo name="chevron-small-down" size={24} color="gray" />
        )}
      </TouchableOpacity>
      {isClicked && (
        <View style={styles.dropdown}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {isLoading ? (
              <ActivityIndicator size="large" color="blue" />
            ) : (
              districts.map((district, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.dropdownItem}
                  onPress={() => handleSelect(district)}
                >
                  <Text
                    style={[
                      styles.itemText,
                      selected === district && { color: "red" },
                    ]}
                  >
                    {district}
                  </Text>
                </TouchableOpacity>
              ))
            )}
            {/* Add padding at the bottom to ensure content is scrollable */}
            <View style={{ height: 20 }} />
          </ScrollView>
        </View>
      )}
    </View>
  );
};


export default DropdownTextInput;
