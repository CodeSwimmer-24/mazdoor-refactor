import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import colors from "../../../../constants/colors";
import { hostUrl } from "../../../../services";
import { useAuthStore } from "../../../../zustand/authStore";
import SuccessAlert from "../../../../constants/SuccessAlert";

const BookingModal = ({
  bookingIsVisible,
  setBookingVisible,
  shortProfile,
  serviceProvider,
}) => {
  const [loading, setLoading] = useState(false);
  const userEmailId = useAuthStore((state) => state.userEmailId);
  const [alertVisible, setAlertVisible] = useState(false);

  const handleBooking = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${hostUrl}/mazdoor/v1/addBooking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          spEmailId: serviceProvider.emailId,
          userEmailId: userEmailId,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setAlertVisible(true);
      setBookingVisible(false);
    } catch (error) {
      console.error("Error making booking:", error);
      Alert.alert("Booking Failed", "There was an error with your booking.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        visible={bookingIsVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalOverlay}
            onPress={() => setBookingVisible(false)}
          />
          <View style={styles.modalContent}>
            <ScrollView>
              <View style={styles.scrollContent}>
                <View style={styles.profileSection}>
                  <Image
                    source={{
                      uri: "https://cdn2.vectorstock.com/i/1000x1000/61/86/construction-worker-avatar-profile-colorful-vector-24396186.jpg",
                    }}
                    style={styles.profileImage}
                  />
                  <View style={styles.profileDetails}>
                    <Text style={styles.greetingText}>Hey there 👋</Text>
                    <Text style={styles.introText}>
                      My name is{" "}
                      <Text style={styles.nameText}>{shortProfile.name}</Text>
                    </Text>
                    <Text style={styles.ageGenderText}>
                      I'm {shortProfile.age} years old {shortProfile.gender}
                    </Text>
                  </View>
                </View>
                <View style={styles.detailsContainer}>
                  <View style={styles.detailBox}>
                    <Ionicons name="call-outline" size={20} color="gray" />
                    <Text style={styles.detailText}>
                      +91 {shortProfile.contactNo}
                    </Text>
                  </View>
                  <View style={styles.detailBox2}>
                    <View style={styles.detailRow}>
                      <MaterialIcons
                        name="location-pin"
                        size={24}
                        color="gray"
                      />
                      <Text style={styles.detailText}>
                        {shortProfile.address?.buildingAddress},{" "}
                        {shortProfile.address?.exactLocation},
                      </Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Ionicons name="map-outline" size={20} color="gray" />
                      <Text style={styles.detailText}>
                        {shortProfile.address?.locality},{" "}
                        {shortProfile.address?.area},{" "}
                        {shortProfile.address?.region}, Delhi
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => setBookingVisible(false)}
                style={[styles.button, styles.closeButton]}
              >
                <Ionicons
                  style={{ marginRight: 5 }}
                  name="archive-outline"
                  size={22}
                  color={colors.danger}
                />
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleBooking}
                style={[styles.button, styles.confirmButton]}
                disabled={loading} // Disable the button when loading
              >
                {loading ? (
                  <ActivityIndicator color={colors.white} />
                ) : (
                  <Text
                    style={[
                      styles.buttonText,
                      {
                        color: colors.white,
                      },
                    ]}
                  >
                    Confirm
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <SuccessAlert
        visible={alertVisible}
        message="Your booking has been confirmed!"
        onClose={() => setAlertVisible(false)}
      />
    </>
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
    height: height * 0.6,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    overflow: "hidden",
    borderTopWidth: 0.5,
    borderTopColor: "lightgray",
  },
  scrollContent: {
    paddingBottom: 20,
  },
  profileSection: {
    alignItems: "center",
    marginTop: 20,
  },
  profileImage: {
    height: 80,
    width: 80,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "lightgray",
  },
  profileDetails: {
    marginTop: 20,
    alignItems: "center",
  },
  greetingText: {
    fontSize: 16,
    color: "#505050",
  },
  introText: {
    marginTop: 2,
    fontSize: 16,
    color: "#505050",
  },
  nameText: {
    fontWeight: "500",
  },
  ageGenderText: {
    marginTop: 5,
    color: "gray",
  },
  detailsContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  detailBox: {
    width: "95%",
    backgroundColor: "#fafafa",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 7,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
  },
  detailBox2: {
    width: "95%",
    backgroundColor: "#fafafa",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 7,
    marginBottom: 20,
  },
  detailText: {
    marginLeft: 5,
    color: "gray",
  },
  buttonContainer: {
    alignItems: "center",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    width: "49%",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 10,
  },
  closeButton: {
    backgroundColor: colors.dangerBackground,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  confirmButton: {
    backgroundColor: colors.primary,
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    color: colors.danger,
    fontWeight: "600",
  },
});

export default BookingModal;
