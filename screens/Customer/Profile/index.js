import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";

const Profile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Profile</Text>
      </View>
      <ScrollView>
        <Header />
        <Body />
        <Footer />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffff",
    height: "100%",
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
});

export default Profile;
