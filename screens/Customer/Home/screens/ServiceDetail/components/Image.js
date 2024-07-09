import { View, Text, Image } from "react-native";
import React from "react";

const BannerImage = () => {
  return (
    <View>
      <Image
        source={{
          uri: "https://www.shutterstock.com/shutterstock/photos/2155242945/display_1500/stock-vector-image-coming-soon-no-photo-no-thumbnail-image-available-missing-picture-icon-vector-illustration-2155242945.jpg",
        }}
        style={{
          height: 260,
          width: "100%",
        }}
      />
    </View>
  );
};

export default BannerImage;
