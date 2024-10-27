import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Alert,
  Modal,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import colors from "../../../../constants/colors";

const Verification = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const openWhatsApp = () => {
    const phoneNumber = "7272977850";
    const message = "I would like to send my Aadhar card for verification.";
    const url = `whatsapp://send?phone=91${phoneNumber}&text=${message}`;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          Alert.alert(
            "Error",
            "WhatsApp is not installed on your device. Please install WhatsApp to proceed."
          );
        }
      })
      .catch((error) => Alert.alert("Error", "Something went wrong."));
  };

  return (
    <View style={styles.container}>
      <View style={styles.verifyButton}>
        <View style={{ width: "80%" }}>
          <Text style={styles.verifyTitle}>Verify yourself</Text>
          <Text style={styles.verifySubtitle}>
            आधार कार्ड से अपना वेरीफिकेशन बैज प्राप्त करें और अपनी पहचान पक्की
            करें।
          </Text>
        </View>
        <MaterialIcons name="verified" size={30} color={colors.success} />
      </View>
      <TouchableOpacity
        onPress={toggleModal}
        style={{
          backgroundColor: colors.success,
          paddingHorizontal: 80,
          paddingVertical: 10,
          marginTop: 10,
          borderRadius: 10,
          elevation: 5,
        }}
      >
        <Text style={{ color: "white", fontWeight: "600" }}>Please Verify</Text>
      </TouchableOpacity>

      <Modal
        transparent
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={toggleModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Send Your Aadhar Card</Text>
            <Text style={styles.modalMessage}>
              Please send your Aadhar card to the number below for verification,
              along with your name and email or phone number.
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={toggleModal}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.whatsappButton}
                onPress={openWhatsApp}
              >
                <FontAwesome name="whatsapp" size={20} color={colors.success} />
                <Text style={styles.whatsappButtonText}>Send via WhatsApp</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Verification;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 20,
  },
  verifyButton: {
    width: "85%",
    flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor: "#4caf502a",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 14,
    borderRadius: 5,
  },
  verifyTitle: {
    fontSize: 25,
    fontWeight: "500",
    color: colors.success,
    paddingVertical: 4,
  },
  verifySubtitle: {
    fontSize: 12,
    fontWeight: "300",
    color: "gray",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: "30%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.baseColor,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  modalMessage: {
    fontSize: 14,
    color: "gray",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  whatsappButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: `${colors.success}1a`,
    paddingVertical: 10,
    borderRadius: 5,
    width: "50%",
    marginRight: 10,
  },
  whatsappButtonText: {
    color: colors.success,
    fontSize: 14,
    marginLeft: 10,
    fontWeight: "600",
  },
  closeButton: {
    width: "40%",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: colors.secondary,
    marginLeft: 10,
  },
  closeButtonText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "600",
  },
});
