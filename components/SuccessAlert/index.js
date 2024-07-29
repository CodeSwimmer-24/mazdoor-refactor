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
import done from "../.../../../assets/assets/done.png";
import colors from "../../constants/colors";

const SuccessAlert = ({ visible, message, onClose, navigation }) => {
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Image source={done} style={styles.image} />
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>{message}</Text>
            <Text style={styles.info}>
              You can find this booking already in your booking list.
            </Text>
          </View>
          <TouchableOpacity
            style={styles.okButton}
            onPress={() => navigation.navigate("Booking")}
          >
            <Text style={styles.okButtonText}>View Booking</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
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
  modalContainer: {
    width: width * 0.8,
    padding: 20,
    backgroundColor: colors.white,
    borderRadius: 5,
    alignItems: "center",
  },
  image: {
    height: 150,
    width: 150,
    marginVertical: 15,
  },
  messageContainer: {
    width: "90%",
    paddingVertical: 20,
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
    paddingHorizontal: 50,
    borderRadius: 5,
    elevation: 5,
    marginBottom: 20,
  },
  okButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "600",
  },
  closeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 0.3,
    borderBottomColor: colors.primary,
    paddingBottom: 4,
  },
  closeButtonText: {
    color: colors.primary,
  },
});

export default SuccessAlert;
