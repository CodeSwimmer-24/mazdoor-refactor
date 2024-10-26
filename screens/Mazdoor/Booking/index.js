import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../../constants/colors";
import Pending from "./components/Pending";
import Confirmed from "./components/Confirmed";
import Completed from "./components/Completed";

const Booking = () => {
  const [loading, setLoading] = useState(false);
  const [screens, setScreens] = useState(1);

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  const switchScreens = () => {
    if (screens === 1) {
      return <Pending />;
    } else if (screens === 2) {
      return <Confirmed />;
    } else if (screens === 3) {
      return <Completed />;
    } else return null;
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar backgroundColor="#f9f9f9" />
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>My Bookings</Text>
        <Text style={styles.subHeaderText}>
          List of people who booked your service.
        </Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            onPress={() => setScreens(1)}
            style={[styles.tab, screens === 1 && styles.activeTab]}
          >
            <Text
              style={[styles.tabText, screens === 1 && styles.activeTabText]}
            >
              Pending
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setScreens(2)}
            style={[styles.tab, screens === 2 && styles.activeTab]}
          >
            <Text
              style={[styles.tabText, screens === 2 && styles.activeTabText]}
            >
              Confirm
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setScreens(3)}
            style={[styles.tab, screens === 3 && styles.activeTab]}
          >
            <Text
              style={[styles.tabText, screens === 3 && styles.activeTabText]}
            >
              Completed
            </Text>
          </TouchableOpacity>
        </View>
        {switchScreens()}
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
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f9f9f9",
    paddingTop: 10,
  },
  tab: {
    width: "33.33%",
    alignItems: "center",
    borderBottomWidth: 2.5,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "600",
    color: "gray",
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  activeTabText: {
    color: colors.primary,
  },
});

export default Booking;
