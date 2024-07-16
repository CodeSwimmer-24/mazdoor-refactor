import { View, Text } from "react-native";
import React from "react";
import NotFound from "../../../../components/NotFound";

const Requested = () => {
  return (
    <View
      style={{
        marginTop: 100,
      }}
    >
      <NotFound info="No new request is there for your service." />
    </View>
  );
};

export default Requested;
