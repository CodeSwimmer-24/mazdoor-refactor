import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  Alert,
  Linking,
  Clipboard,
} from "react-native";
import Modal from "react-native-modal";
import {
  MaterialIcons,
  Ionicons,
  FontAwesome6,
  FontAwesome,
  Entypo,
} from "@expo/vector-icons";
import colors from "../../../../constants/colors";
import { useAuthStore } from "../../../../zustand/authStore";
import { hostUrl } from "../../../../services";

const BookingModal = ({
  bookingIsVisible,
  setBookingVisible,
  shortProfile,
  serviceProvider,
  navigation,
  isSubscribed,
  emailId
}) => {
  const { name, email } = useAuthStore((state) => ({
    name: state.name,
    email: state.email,
  }));


  const copyToClipboard = () => {
    Clipboard.setString(shortProfile.contactNo.toString());
  };

  const openWhatsApp = (number) => {
    handleViewBooking()
    Linking.openURL(`whatsapp://send?phone=+91${number}`).catch(() =>
      Alert.alert("Error", "WhatsApp is not installed on your device.")
    );
  };

  const makeCall = (number) => {
    handleViewBooking()
    Linking.openURL(`tel:${number}`).catch(() =>
      Alert.alert("Error", "Phone dialer is not available on your device.")
    );
  };

  const handleViewBooking = async () => {
    try {
      const response = await fetch(
        `${hostUrl}/mazdoor/v1/getUserSubscription?role=customer&spEmailId=${emailId}&userEmailId=${email}`
      );
      const data = await response.json(); // Parse the response as JSON

      // Update the state with the isSubscribed value
      // setIsSubscribed(data.isSubscribed);
    } catch (error) {
      console.error("Error fetching data:", error); // Handle any errors
    }
  };

  return (
    <Modal
      isVisible={bookingIsVisible}
      onBackdropPress={() => setBookingVisible(false)}
      style={styles.modalContainer}
    >
      <View style={styles.modalContent}>
        <ScrollView>
          <View style={styles.scrollContent}>
            <View style={styles.closeButtonContainer}>
              <TouchableOpacity
                onPress={() => setBookingVisible(false)}
                style={styles.closeButton}
              >
                <Entypo name="cross" size={20} color={colors.danger} />
              </TouchableOpacity>
            </View>
            <View style={styles.profileSection}>
              <Image
                source={{
                  uri: "https://previews.123rf.com/images/jemastock/jemastock1911/jemastock191114276/133601522-construction-worker-avatar-profile-vector-illustration-graphic-design.jpg",
                }}
                style={styles.profileImage}
              />
              <View style={styles.profileDetails}>
                <Text style={styles.introText}>{shortProfile.name}</Text>
                <Text style={styles.ageGenderText}>
                  {shortProfile.age} years old, {shortProfile.gender}ale
                </Text>
              </View>
            </View>
            <View style={styles.detailsContainer}>
              <View
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 20,
                }}
              >
                <Text
                  style={{
                    textAlign: "left",
                    fontSize: 18,
                    fontWeight: "600",
                    color: "#505050",
                  }}
                >
                  Note:
                </Text>
                <Text
                  style={{
                    paddingVertical: 10,
                    color: colors.primary,
                    lineHeight: 20,
                    fontWeight: "300"
                  }}
                >
                  Service charge may vary for each service provider. The
                  customer is solely responsible to discuss the service charge
                  with the service provider. DigiMazdoor has no role in it.
                </Text>
              </View>
              {isSubscribed && (
                <View style={styles.detailBox2}>
                  <View style={styles.detailRow}>
                    <MaterialIcons
                      name="location-pin"
                      size={24}
                      color="gray"
                    />
                    <Text style={styles.detailText}>
                      {shortProfile.address?.buildingAddress}
                      {shortProfile.address?.exactLocation}
                    </Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailText}>
                      {shortProfile.address?.locality},
                      {shortProfile.address?.area},
                      {shortProfile.address?.region},
                      {shortProfile.address?.city}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </View>

          {isSubscribed ? (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => makeCall(shortProfile.contactNo)}
                style={[styles.button, styles.confirmButton]}
              >
                <MaterialIcons name="call" size={24} color="white" />
                <Text style={[styles.buttonText, { color: colors.white }]}>Contact Now</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => openWhatsApp(shortProfile.contactNo)}
                style={[styles.button, styles.whatsappButton]}
              >
                <FontAwesome name="whatsapp" size={24} color="#fff" />
                <Text
                  style={[
                    styles.buttonText,
                    {
                      color: "#fff",
                    },
                  ]}
                >
                  WhatsApp
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.oppsContainer}>
              <Text style={styles.oppsText}>OPPS!</Text>
              <Text style={styles.oppsDescription}>
                No subscription found, please check out the plans and subscribe
                to our services.
              </Text>

              <View style={styles.fixedButtonContainer}>
                <TouchableOpacity
                  onPress={() => alert("Redirect to subscription plans")}
                  style={styles.subscribeButton}
                >
                  <Text style={styles.subscribeButtonText}>Please Subscribe</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    </Modal>
  );
};

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  modalContainer: {
    margin: 0,
    justifyContent: "flex-end",
  },
  modalContent: {
    height: height * 0.85,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  closeButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  closeButton: {
    backgroundColor: colors.dangerBackground,
    padding: 5,
    borderRadius: 50,
  },
  profileSection: {
    alignItems: "center",
    marginTop: 20,
  },
  profileImage: {
    height: 85,
    width: 85,
    borderRadius: 50,
  },
  profileDetails: {
    marginTop: 10,
    alignItems: "center",
  },
  introText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#505050",
  },
  ageGenderText: {
    color: "gray",
  },
  detailsContainer: {
    alignItems: "center",
  },
  detailBox2: {
    width: "95%",
    backgroundColor: "#fafafa",
    padding: 10,
    borderRadius: 7,
    marginBottom: 0,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailText: {
    marginLeft: 5,
    color: "gray",
  },
  buttonContainer: {},
  button: {
    flex: 1,
    alignItems: "center",
    padding: 12,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  whatsappButton: {
    backgroundColor: "#25d366",
    flexDirection: "row",
    justifyContent: "center",
    elevation: 5,
    marginBottom: 50,
  },
  confirmButton: {
    backgroundColor: colors.primary,
    flexDirection: "row",
    justifyContent: "center",
    elevation: 5,
    marginTop: 50,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
    marginLeft: 10,
  },
  oppsContainer: {
    alignItems: "center",
    marginTop: 40,
    paddingBottom: 100,
  },
  oppsText: {
    fontSize: 39,
    fontWeight: "600",
    color: colors.baseColor,
  },
  oppsDescription: {
    textAlign: "center",
    marginTop: 20,
    color: "gray",
    marginBottom: 40,
  },
  fixedButtonContainer: {
    position: "absolute",
    bottom: 10,
    left: 5,
    right: 5,
    alignItems: "center",
  },
  subscribeButton: {
    width: "100%",
    backgroundColor: colors.primary,
    flexDirection: "row",
    paddingVertical: 12,
    justifyContent: "center",
    borderRadius: 10,
    elevation: 3,
  },
  subscribeButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});

export default BookingModal;