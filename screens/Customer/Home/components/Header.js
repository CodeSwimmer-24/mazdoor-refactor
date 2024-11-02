import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SimpleLineIcons, Feather, Foundation } from "@expo/vector-icons";
import { moderateScale } from "react-native-size-matters";
import colors from "../../../../constants/colors";
import useProfileImage from "../../../../constants/profileImage";
import { useAuthStore } from "../../../../zustand/authStore";
import { useModalStore } from "../../../../zustand/modalStore";

const Header = ({ name, locality, setIsDrawerVisible }) => {
  const profileImageUri = useProfileImage();
  const { exactLocation, role } = useAuthStore();
  const notificationCount = 0;
  const { setIsVisible } = useModalStore();

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
            {role === "customer" && (
              <TouchableOpacity onPress={() => setIsDrawerVisible(true)}>
                <View style={styles.notificationIconContainer}>
                  <Feather
                    name="bell"
                    size={moderateScale(22)}
                    color={colors.primary}
                  />
                  <View style={styles.notificationCountContainer}>
                    <Text style={styles.notificationCountText}>
                      {notificationCount}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.locationContainer}>
            <View
              style={[
                styles.locationContent,
                {
                  width: role === "mazdoor" ? "90%" : "75%",
                },
              ]}
            >
              <SimpleLineIcons
                name="location-pin"
                size={moderateScale(20)}
                color="gray"
              />
              <Text style={styles.locationText}>
                {exactLocation ? `${exactLocation}, ` : "CurrentLocation"}
                {locality ? locality : "Area"}
              </Text>
            </View>
            {role === "customer" && (
              <TouchableOpacity
                onPress={() => setIsVisible(true)}
                style={styles.indentMoreButton}
              >
                <Foundation
                  name="indent-more"
                  size={moderateScale(18)}
                  color={colors.primary}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#f9f9f9",
    paddingBottom: moderateScale(15),
    paddingHorizontal: moderateScale(5),
    paddingVertical: moderateScale(2),
    borderBottomRightRadius: moderateScale(10),
    borderBottomLeftRadius: moderateScale(10),
  },
  headerContent: {
    alignItems: "center",
  },
  headerTopRow: {
    marginTop: moderateScale(50),
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileIcon: {
    height: moderateScale(40),
    width: moderateScale(40),
    borderRadius: moderateScale(50),
    marginRight: moderateScale(10),
  },
  welcomeText: {
    fontSize: moderateScale(12),
    fontWeight: "300",
    color: colors.primary,
  },
  userName: {
    fontWeight: "600",
    fontSize: moderateScale(18),
    color: colors.baseColor,
  },
  notificationIconContainer: {
    position: "relative",
  },
  notificationCountContainer: {
    position: "absolute",
    right: moderateScale(-6),
    top: moderateScale(-8),
    backgroundColor: colors.primary,
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(6),
    paddingVertical: moderateScale(2),
    alignItems: "center",
  },
  notificationCountText: {
    textAlign: "center",
    color: "white",
    fontSize: moderateScale(10),
    fontWeight: "bold",
  },
  locationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
    marginTop: moderateScale(18),
  },
  locationContent: {
    width: "75%",
    height: moderateScale(46),
    backgroundColor: "#fff",
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(10),
  },
  locationText: {
    color: "gray",
    marginLeft: moderateScale(10),
    fontSize: moderateScale(14),
  },
  indentMoreButton: {
    backgroundColor: "white",
    paddingVertical: moderateScale(12),
    paddingHorizontal: moderateScale(15),
    borderRadius: moderateScale(10),
    elevation: 5,
    marginLeft: moderateScale(10),
  },
});

export default Header;
