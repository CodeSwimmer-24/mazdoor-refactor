import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { SimpleLineIcons, Octicons } from "@expo/vector-icons";
import colors from "../../../../constants/colors";
import useProfileImage from "../../../../constants/profileImage";

const Header = ({ name, locality, buildingAddress }) => {
  const profileImageUri = useProfileImage();
  return (
    <View>
      <View style={styles.headerContainer}>
        <StatusBar animated={true} backgroundColor="transparent" />
        <View style={styles.headerContent}>
          <View style={styles.headerTopRow}>
            <View style={styles.profileInfo}>
              <Image
                source={{
                  uri: profileImageUri,
                }}
                style={styles.profileIcon}
              />
              <View>
                <Text style={styles.welcomeText}>Hey, Welcome 👋</Text>
                <Text style={styles.userName}>{name}</Text>
              </View>
            </View>
            <TouchableOpacity>
              <Octicons name="bell" size={22} color={colors.baseColor} />
            </TouchableOpacity>
          </View>
          <View style={styles.locationContainer}>
            <View style={styles.locationContent}>
              <SimpleLineIcons name="location-pin" size={22} color="gray" />
              <Text style={styles.locationText}>
                {buildingAddress ? buildingAddress : "CurrenetLocation"},
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
    height: 45,
    width: 45,
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
  },
  profilePicture: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    height: 45,
    width: 45,
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
    fontSize: 20,
    color: colors.baseColor,
  },
  locationContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
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
});

export default Header;
