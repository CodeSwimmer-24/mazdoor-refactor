import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SimpleLineIcons, Feather } from "@expo/vector-icons";
import colors from "../../../../constants/colors";
import useProfileImage from "../../../../constants/profileImage";
import { useAuthStore } from "../../../../zustand/authStore";
import Notification from "../../../../components/Notification";

const Header = ({ name, locality, setIsDrawerVisible }) => {
  const profileImageUri = useProfileImage();
  const { exactLocation } = useAuthStore();

  const notificationCount = 0;

  return (
    <View>
      <View style={styles.headerContainer}>
        <StatusBar animated={true} backgroundColor="transparent" />
        <View style={styles.headerContent}>
          <View style={styles.headerTopRow}>
            <View style={styles.profileInfo}>
              <Image source={profileImageUri} style={styles.profileIcon} />
              <View>
                <Text style={styles.welcomeText}>Hey, Welcome 👋</Text>
                <Text style={styles.userName}>{name}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => setIsDrawerVisible(true)}>
              <View style={styles.notificationIconContainer}>
                <Feather name="bell" size={22} color={colors.primary} />

                <View style={styles.notificationCountContainer}>
                  <Text style={styles.notificationCountText}>
                    {notificationCount}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.locationContainer}>
            <View style={styles.locationContent}>
              <SimpleLineIcons name="location-pin" size={22} color="gray" />
              <Text style={styles.locationText}>
                {exactLocation ? `${exactLocation}, ` : "CurrentLocation"}
                {locality ? locality : "Area"}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    height: "100%",
    backgroundColor: "white",
  },
  headerContainer: {
    backgroundColor: "#f9f9f9",
    paddingBottom: 20,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  headerContent: {
    alignItems: "center",
  },
  headerTopRow: {
    marginTop: 50,
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginBottom: 10,
    marginTop: -5,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#505050",
  },
  seeMoreButton: {
    backgroundColor: "#673de71a",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 50,
  },
  profileIcon: {
    height: 50,
    width: 50,
    borderRadius: 50,
    marginRight: 10,
  },
  seeMoreText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#673de7",
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  profilePicture: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    height: 46,
    width: 46,
    backgroundColor: "white",
    borderRadius: 50,
    borderColor: "gray",
    elevation: 2,
  },
  profileInitials: {
    fontSize: 16,
    fontWeight: "600",
    color: "#C8C8C8",
  },
  welcomeText: {
    fontSize: 12,
    fontWeight: "300",
    color: colors.primary,
  },
  userName: {
    fontWeight: "600",
    fontSize: 19,
    color: colors.baseColor,
  },
  locationContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
  },
  locationContent: {
    width: "90%",
    height: 50,
    backgroundColor: "#ffff",
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  locationText: {
    color: "gray",
    marginLeft: 10,
    fontSize: 14,
  },
  signOutButtonContainer: {
    marginTop: 50,
    paddingHorizontal: 20,
  },
  notificationIconContainer: {
    position: "relative",
  },
  notificationCountContainer: {
    position: "absolute",
    right: -6,
    top: -8,
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    alignItems: "center",
  },
  notificationCountText: {
    textAlign: "center",
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
});

export default Header;
