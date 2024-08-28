import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import colors from "../../../../constants/colors";

const Verification = () => {
  return (
    <View style={{ alignItems: "center", marginTop: 20 }}>
      <TouchableOpacity
        style={{
          width: "85%",
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "#4caf502a",
          alignItems: "center",
          paddingHorizontal: 10,
          paddingVertical: 14,
          borderRadius: 5,
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              color: "#4caf50",
              paddingVertical: 4,
            }}
          >
            Verify your self
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "300",
              color: "gray",
            }}
          >
            Get your verification bagde to verify your self.
          </Text>
        </View>
        <MaterialIcons name="verified" size={30} color="#4caf50" />
      </TouchableOpacity>
    </View>
  );
};

export default Verification;
