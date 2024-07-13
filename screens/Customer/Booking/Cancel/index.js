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
import colors from "../../../../constants/colors";
import { hostUrl } from "../../../../services";

const Cancel = ({
  cancelVisible,
  setCancelVisible,
  name,
  email,
  bookingId,
  setReload,
}) => {
  const [loading, setLoading] = useState(false);

  const handleCancelBooking = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${hostUrl}/mazdoor/v1/updateBookingStatus?bookingId=${bookingId}&status=CANCELLED`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();
      if (response.ok) {
        Alert.alert("Success", "Booking cancelled successfully");
        setCancelVisible(false);
        setReload(true);
      } else {
        Alert.alert("Error", result.message || "Failed to cancel booking");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to cancel booking");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={cancelVisible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setCancelVisible(false)}
        />
        <View style={styles.modalContent}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.profileSection}>
              <Image
                style={styles.profileImage}
                source={{
                  uri: "https://img.freepik.com/free-photo/close-up-man-wearing-protection-helmet_23-2148921427.jpg",
                }}
              />
              <Text style={styles.profileName}>{name}</Text>
              <Text style={styles.profileEmail}>{email}</Text>
              <Text style={styles.profileEmail}>{bookingId}</Text>
            </View>
          </ScrollView>

          <View style={styles.closeButtonContainer}>
            <TouchableOpacity
              style={[
                styles.closeButton,
                { backgroundColor: colors.dangerBackground },
              ]}
              onPress={handleCancelBooking}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={colors.danger} />
              ) : (
                <Text
                  style={[
                    styles.closeButtonText,
                    { color: colors.danger, fontWeight: "600" },
                  ]}
                >
                  Cancel Booking
                </Text>
              )}
            </TouchableOpacity>
          </View>
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
    height: height * 0.4,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
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
  },
  profileName: {
    marginTop: 10,
    fontSize: 20,
    color: "#505050",
  },
  profileEmail: {
    fontSize: 12,
    color: "gray",
    fontWeight: "300",
  },
  closeButtonContainer: {
    alignItems: "center",
    padding: 10,
  },
  closeButton: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 10,
  },
  closeButtonText: {
    fontSize: 16,
    color: "white",
  },
});

export default Cancel;
