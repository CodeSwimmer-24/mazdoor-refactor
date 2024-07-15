import { View, Text } from "react-native";
import React from "react";
import NotFound from "../../../../components/NotFound";

const Canceled = () => {
  return (
    <View
      style={{
        marginTop: 100,
      }}
    >
      <NotFound info="No Closed Bookig is there in your list" />
    </View>
  );
};

export default Canceled;
