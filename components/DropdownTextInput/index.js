import React, { useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import colors from "../../constants/colors";
import styles from "./styles";
import { Dropdown } from "react-native-element-dropdown";

const DropdownTextInput = ({
  iconName,
  list = [],
  iconType,
  placeholder,
  value,
  onChangeText,
}) => {
  const [selected, setSelected] = useState(value || placeholder);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");

  const handleSelect = (item) => {
    setSelected(item.label);
    onChangeText(item.value); // Call the parent component's onChangeText handler
  };

  return (
    <View style={{ flex: 1 }}>
      <Dropdown
        style={styles.dropdownButton}
        placeholderStyle={{ color: "#D0D0D0" }}
        selectedTextStyle={{ color: colors.baseColor }}
        iconStyle={{ color: "gray" }}
        data={list.map((item) => ({ label: item, value: item }))}
        search
        searchPlaceholder="Search..."
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={selected}
        onChange={(item) => handleSelect(item)}
        onChangeText={setSearch}
        renderLeftIcon={() =>
          iconType === "Ionicons" && (
            <FontAwesome
              name="map-o"
              size={14}
              color="lightgray"
              style={styles.icon}
            />
          )
        }
        renderRightIcon={() => (
          <Entypo
            name="chevron-small-down"
            size={24}
            color="gray"
            style={styles.icon}
          />
        )}
      />
      {isLoading && <ActivityIndicator size="large" color="blue" />}
    </View>
  );
};

export default DropdownTextInput;
