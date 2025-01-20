import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../../constants/colors";
import Completed from "./components/Completed"; // Only import Completed
import Feedback from "./Page/Feedback";

const Booking = () => {
  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar backgroundColor="#f9f9f9" />
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Your Feedbacks</Text>
        <Text style={styles.subHeaderText}></Text>
      </View>
      <ScrollView style={styles.scrollView}>
        {/* Only render the Completed component */}
        <Feedback />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    backgroundColor: colors.white,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  safeAreaView: {
    backgroundColor: colors.white,
    height: "100%",
  },
  headerContainer: {
    backgroundColor: "#f9f9f9",
    paddingVertical: 16,
    paddingHorizontal: 10,
  },
  headerText: {
    paddingHorizontal: 20,
    fontSize: 20,
    fontWeight: "600",
    color: "#505050",
  },
  subHeaderText: {
    paddingHorizontal: 20,
    paddingTop: 5,
    fontSize: 12,
    fontWeight: "300",
    color: "gray",
  },
  scrollView: {
    backgroundColor: "white",
    zIndex: 100,
  },
});

export default Booking;
