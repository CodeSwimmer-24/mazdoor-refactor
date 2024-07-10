import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import auth from "@react-native-firebase/auth";
import { MaterialCommunityIcons, AntDesign, Entypo } from "@expo/vector-icons";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useAuthStore } from "../../../../zustand/authStore";
import { useCustomerStore } from "../../../../zustand/customerStore";
import colors from "../../../../constants/colors";

const Footer = () => {
  const authStore = useAuthStore();
  const customerStore = useCustomerStore();

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await auth().signOut();
      // setUser(null);

      authStore.reset();
      customerStore.reset();
    } catch (error) {
      console.error("Failed to sign out user.", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.footer}>
        <View style={styles.footerItem}>
          <TouchableOpacity style={styles.iconWrapper}>
            <MaterialCommunityIcons
              name="share"
              size={24}
              color={colors.primary}
            />
          </TouchableOpacity>
          <Text style={styles.text}>App Share</Text>
        </View>
        <View style={styles.footerItem}>
          <TouchableOpacity style={styles.iconWrapper}>
            <Entypo name="message" size={20} color={colors.primary} />
          </TouchableOpacity>
          <Text style={styles.text}>Feedback</Text>
        </View>
        <View style={styles.footerItem}>
          <TouchableOpacity onPress={signOut} style={styles.iconWrapper}>
            <AntDesign name="logout" size={20} color="rgb(244, 67, 54)" />
          </TouchableOpacity>
          <Text style={[styles.text, styles.logoutText]}>Log Out</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: "center",
  },
  footer: {
    backgroundColor: "#f9f9f9",
    width: "90%",
    elevation: 1,
    marginBottom: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    paddingVertical: 15,
  },
  footerItem: {
    alignItems: "center",
  },
  iconWrapper: {
    backgroundColor: "#673de71a",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 50,
  },
  text: {
    marginTop: 2,
    fontSize: 12,
    color: "#505050",
  },
  logoutText: {
    color: "rgb(244, 67, 54)",
  },
});

export default Footer;
