import React from "react";
import {
  View,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Text,
  Image,
  Linking,
} from "react-native";
import { Entypo, Ionicons, FontAwesome } from "@expo/vector-icons"; // Added missing imports
import colors from "../../../../../constants/colors";

const AllBanners = ({ isVisible, setIsVisible }) => {
  const { height } = Dimensions.get("window");
  const modalHeight = height * 0.65;

  const offerList = [
    "https://ceoptions.com/wp-content/uploads/2017/10/Promotional-Marketing-Strategies-to-Boost-Sales.jpg",
  ];

  // Example contact number, replace with actual data
  const contactNumber = "+91 7272977850";

  // Function to make a phone call
  const makeCall = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`).catch((err) =>
      console.error("Failed to make a call:", err)
    );
  };

  // Function to open WhatsApp chat
  const openWhatsApp = (phoneNumber) => {
    let url = `whatsapp://send?phone=${phoneNumber}`;
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open WhatsApp:", err)
    );
  };

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setIsVisible(false)}
        />
        <View style={[styles.modalContent, { height: modalHeight }]}>
          <ScrollView>
            <View style={styles.header}>
              <Text style={styles.headerText}>List of promotions</Text>
              <TouchableOpacity
                onPress={() => setIsVisible(false)}
                style={styles.closeButton}
              >
                <Entypo name="cross" size={20} color={colors.danger} />
              </TouchableOpacity>
            </View>
            <View style={styles.imageContainer}>
              {offerList.map((url, index) => (
                <Image key={index} source={{ uri: url }} style={styles.image} />
              ))}
            </View>
            <View>
              <Text
                style={{
                  marginVertical: 20,
                  fontSize: 18,
                  fontWeight: "600",
                  color: "#505050",
                }}
              >
                Contact for Promotions
              </Text>
              <View
                style={[
                  styles.buttonContainer,
                  {
                    marginBottom: 20,
                  },
                ]}
              >
                <TouchableOpacity
                  onPress={() => makeCall(contactNumber)}
                  style={[
                    styles.button,
                    styles.callButton,
                    { width: "48%", borderRadius: 10, elevation: 0 },
                  ]}
                >
                  <Ionicons name="call-outline" size={20} color="#4782da" />
                  <Text
                    style={[
                      styles.buttonText,
                      { color: "#4782da", fontSize: 14 },
                    ]}
                  >
                    Audio Call
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => openWhatsApp(contactNumber)}
                  style={[
                    styles.button,
                    styles.whatsappButton,
                    { width: "48%", borderRadius: 10, elevation: 0 },
                  ]}
                >
                  <FontAwesome name="whatsapp" size={20} color="#4caf50" />
                  <Text
                    style={[
                      styles.buttonText,
                      { color: "#4caf50", fontSize: 14 },
                    ]}
                  >
                    WhatsApp
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

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
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    overflow: "hidden",
    borderTopWidth: 0.5,
    borderTopColor: "lightgray",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 18,
    color: "#505050",
  },
  closeButton: {
    backgroundColor: colors.dangerBackground,
    padding: 5,
    borderRadius: 50,
  },
  imageContainer: {
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    resizeMode: "cover",
    marginTop: 20,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  buttonContainer: {
    alignItems: "center",
    // padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 2,
    flexDirection: "row",
    justifyContent: "center",
  },
  callButton: {
    backgroundColor: "#4782da1a",
  },
  whatsappButton: {
    backgroundColor: "#4caf501a",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "400",
    marginLeft: 8,
  },
  oppsContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AllBanners;
