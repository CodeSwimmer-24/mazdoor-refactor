import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import { useAuthStore } from "../../../zustand/authStore";

const Profile = () => {
  const {
    name,
    email,
    contact,
    buildingAddress,
    locality,
    exactLocation,
    role,
    aadharNo,
    age,
  } = useAuthStore();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Header
          contact={contact}
          buildingAddress={buildingAddress}
          locality={locality}
          exactLocation={exactLocation}
          name={name}
          email={email}
          role={role}
          aadharNo={aadharNo}
          age={age}
        />
        <Body
          name={name}
          email={email}
          contact={contact}
          buildingAddress={buildingAddress}
          locality={locality}
          exactLocation={exactLocation}
          role={role}
          aadharNo={aadharNo}
          age={age}
        />
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
