import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import { useAuthStore } from "../../../zustand/authStore";

const Profile = () => {
  const { name, email, contact, buildingAddress, locality, exactLocation } = useAuthStore();

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Profile</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Header
          contact={contact}
          buildingAddress={buildingAddress}
          locality={locality}
          name={name}
          email={email}
        />
        <Body
          name={name}
          email={email}
          contact={contact}
          buildingAddress={buildingAddress}
          locality={locality}
          exactLocation={exactLocation}
        />
        <Footer />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
  },
  headerContainer: {
    paddingHorizontal: 28,
    paddingTop: 50,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "500",
    color: "#505050",
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 70,
  },
});

export default Profile;
