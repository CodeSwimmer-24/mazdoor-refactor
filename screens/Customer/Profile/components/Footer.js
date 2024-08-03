import React from "react";
import {
  View,
  Text,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import auth from "@react-native-firebase/auth";
import colors from "../../../../constants/colors";
import { useAuthStore } from "../../../../zustand/authStore";
import { useCustomerStore } from "../../../../zustand/customerStore";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import AntDesign from "@expo/vector-icons/AntDesign";

const Footer = ({ logoutVisible, setLogoutVisible }) => {
  const authStore = useAuthStore();
  const customerStore = useCustomerStore();

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await auth().signOut();

      authStore.reset();
      customerStore.reset();
    } catch (error) {
      console.error("Failed to sign out user.", error);
    }
  };

  return (
    <Modal visible={logoutVisible} transparent={true} animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalOverlay}
            onPress={() => setLogoutVisible(false)}
          />
          <View style={styles.modalContent}>
            <ScrollView>
              <View style={styles.iconContainer}>
                <AntDesign name="warning" size={24} color={colors.primary} />
                <Text style={styles.title}>Signout from Digimazdoor</Text>
                <Text style={styles.message}>
                  Are you sure you want to sign out from this Application?
                </Text>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.cancelButton]}
                  onPress={() => setLogoutVisible(false)}
                >
                  <Text style={[styles.buttonText, styles.cancelButtonText]}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.logoutButton]}
                  onPress={signOut}
                >
                  <Text style={[styles.buttonText, styles.logoutButtonText]}>
                    Logout
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: colors.white,
    borderRadius: 5,
    overflow: "hidden",
  },
  modalContent: {
    padding: 20,
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    paddingTop: 10,
    fontSize: 16,
    fontWeight: "600",
    color: colors.baseColor,
  },
  message: {
    paddingTop: 5,
    fontSize: 12,
    fontWeight: "300",
    color: "gray",
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    width: "48%",
    paddingVertical: 12,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: colors.secondary,
  },
  logoutButton: {
    backgroundColor: colors.dangerBackground,
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "400",
  },
  cancelButtonText: {
    color: colors.primary,
  },
  logoutButtonText: {
    color: colors.danger,
  },
});

export default Footer;
