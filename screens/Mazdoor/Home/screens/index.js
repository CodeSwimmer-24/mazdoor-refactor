import { View, Text } from "react-native";
import React from "react";
import Header from "../../../Customer/Home/components/Header";
import { useAuthStore } from "../../../../zustand/authStore";
import colors from "../../../../constants/colors";
import Banner from "../../../Customer/Home/components/Banner";
import Graph from "../components/Graph";
import Status from "../components/Status";
import Verification from "../components/Verification";

const MazdoorHome = () => {
  const { name, locality, buildingAddress } = useAuthStore();

  return (
    <View
      style={{
        height: "100%",
        backgroundColor: colors.white,
      }}
    >
      <Header
        name={name}
        buildingAddress={buildingAddress}
        locality={locality}
      />
      <Banner />
      <Status />
      <Verification />
    </View>
  );
};

export default MazdoorHome;
