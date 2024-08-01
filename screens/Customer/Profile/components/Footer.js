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

const Footer = ({ logoutVisible, setLogoutVisible }) => {
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
    <Modal visible={logoutVisible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setLogoutVisible(false)}
        />
        <View style={styles.modalContent}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <TouchableOpacity style={styles.confirmButton} onPress={signOut}>
              <Text style={styles.confirmButtonText}>Confirm Logout</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    height: height * 0.2,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    overflow: "hidden",
    borderTopWidth: 0.5,
    borderTopColor: "lightgray",
  },
  scrollViewContent: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    marginTop: 30,
  },
  confirmButton: {
    width: "95%",
    backgroundColor: colors.danger,
    paddingVertical: 12,
    borderRadius: 10,
    elevation: 5,
    marginVertical: 15,
  },
  confirmButtonText: {
    textAlign: "center",
    fontSize: 18,
    color: "white",
  },
});

export default Footer;
