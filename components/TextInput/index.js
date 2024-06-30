import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import colors from "../../constants/colors";

const CustomTextInput = ({
  iconName,
  iconType,
  placeholder,
  value,
  onChangeText,
  editable,
  keyboardType = "default",
}) => {
  const IconComponent = iconType === "Ionicons" ? Ionicons : MaterialIcons;

  return (
    <View style={styles.inputContainer}>
      <IconComponent name={iconName} size={20} color="#C0C0C0" />
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        placeholderTextColor="#D0D0D0"
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        selectionColor={colors.baseColor}
        editable={editable === false ? false : true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.7,
    borderColor: "lightgray",
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: "white",
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: colors.baseColor,
  },
});

export default CustomTextInput;
