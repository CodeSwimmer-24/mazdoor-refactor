import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import noData from "../../assets/assets/NoBooking.png";
import nolike from "../../assets/assets/nolike.png";
import colors from "../../constants/colors";
import { useAuthStore } from "../../zustand/authStore";

const NotFound = ({ info, image }) => {
  const { role } = useAuthStore();
  return (
    <View style={styles.noDataContainer}>
      {image === "nolike" ? (
        <Image source={nolike} style={styles.noDataImage} />
      ) : (
        <Image source={noData} style={styles.noDataImage} />
      )}
      <Text style={styles.noDataTitle}>Coming Soon!</Text>
      {/* {role === "mazdoor" && (
        <Text
          style={{
            textAlign: "center",
            paddingHorizontal: 20,
            paddingTop: 20,
            color: "gray",
          }}
        >
          This service is not avalable in this location, please try some other
          location or survice to get the service provider.
        </Text>
      )} */}
      <Text style={styles.noDataSubtitle}>{info}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
  },
  noDataImage: {
    marginTop: "0%",
    height: 250,
    width: 250,
  },
  noDataTitle: {
    fontSize: 40,
    fontWeight: "600",
    color: colors.baseColor,
    textAlign: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  noDataSubtitle: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: "300",
    color: "gray",
    textAlign: "center",
  },
});

export default NotFound;
