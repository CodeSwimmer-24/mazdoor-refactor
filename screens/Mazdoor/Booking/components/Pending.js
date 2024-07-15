import { View, Text } from "react-native";
import React from "react";
import NotFound from "../../../../components/NotFound";

const Pending = () => {
  return (
    <View
      style={{
        marginTop: 100,
      }}
    >
      <NotFound info="No Booking's find in your pending list. " />
    </View>
  );
};

export default Pending;
