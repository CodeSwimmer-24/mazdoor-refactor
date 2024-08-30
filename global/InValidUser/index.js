import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import colors from "../../constants/colors";

const InvalidUser = ({ showModal, handleCloseModal }) => {
  return (
    <Modal
      visible={showModal}
      transparent={true}
      animationType="slide"
      onRequestClose={handleCloseModal}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Ionicons name="warning-outline" size={35} color={colors.danger} />
          <Text style={styles.modalTitle}>Invalid Login</Text>
          <Text style={styles.modalMessage}>
            Sorry! Your email is registered with a different role. Please log in
            with the correct role.
          </Text>
          <TouchableOpacity style={styles.okButton} onPress={handleCloseModal}>
            <Text style={styles.okButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 5,
    alignItems: "center",
  },
  modalTitle: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: colors.baseColor,
  },
  modalMessage: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: "center",
    paddingHorizontal: 10,
    color: "gray",
  },
  okButton: {
    backgroundColor: colors.secondary,
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 2,
  },
  okButtonText: {
    color: "white",
    fontWeight: "600",
    color: colors.primary,
  },
});

export default InvalidUser;
