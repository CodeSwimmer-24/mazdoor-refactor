import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Header from "../../../Customer/Home/components/Header";
import { useAuthStore } from "../../../../zustand/authStore";
import colors from "../../../../constants/colors";
import Status from "../components/Status";
import Verification from "../components/Verification";
import ViewSubscription from "../components/ViewSubscription";
import { hostUrl } from "../../../../services";

const MazdoorHome = () => {
  const { name, locality, buildingAddress, email } = useAuthStore();
  const [serviceProviderData, setServiceProviderData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch ServiceProvider data function
  const fetchServiceProviderData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${hostUrl}/mazdoor/v1/getServiceProviderDetails?emailId=${email}`
      );
      const data = await response.json();
      setServiceProviderData(data.serviceProvider || null);
    } catch (error) {
      console.error("Error fetching service provider details:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when the screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      fetchServiceProviderData();
    }, [email])
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

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
      <ScrollView>
        <ViewSubscription />
        <Status
          serviceProviderData={serviceProviderData}
          reloadData={fetchServiceProviderData}
        />
        <Verification />
      </ScrollView>
    </View>
  );
};

export default MazdoorHome;
