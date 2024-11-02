import { View, Text, ScrollView } from "react-native";
import React from "react";
import Header from "../../../Customer/Home/components/Header";
import { useAuthStore } from "../../../../zustand/authStore";
import colors from "../../../../constants/colors";
import Status from "../components/Status";
import Verification from "../components/Verification";
import ViewSubscription from "../components/ViewSubscription";

const MazdoorHome = () => {
  const { name, locality, buildingAddress, role } = useAuthStore();

  return (
    <ScrollView
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
      <ViewSubscription />
      <Status />
      <Verification />
    </ScrollView>
  );
};

export default MazdoorHome;
