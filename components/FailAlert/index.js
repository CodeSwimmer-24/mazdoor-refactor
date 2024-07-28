import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import fail from "../.../../../assets/assets/fail.png";
import colors from "../../constants/colors";

const FailAlert = ({ visible, message, onClose }) => {
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Image source={fail} style={styles.image} />
          <View
            style={{
              width: "90%",
              paddingVertical: 20,
            }}
          >
            <Text style={styles.messageText}>{message}</Text>
            <Text style={styles.info}>
              You can find this booking alredy in your booking list.
            </Text>
          </View>
          <TouchableOpacity style={styles.okButton} onPress={onClose}>
            <Text style={styles.okButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 150,
    width: 150,
    marginTop: 15,
    marginBottom: 15,
  },
  modalContainer: {
    width: width * 0.8,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: colors.white,
    borderRadius: 5,
    alignItems: "center",
  },
  messageText: {
    fontSize: 20,
    color: "#505050",
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "600",
  },
  info: {
    fontSize: 14,
    color: "gray",
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "300",
  },
  okButton: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 80,
    borderRadius: 5,
    elevation: 5,
    marginBottom: 30,
  },
  okButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
});

export default FailAlert;
