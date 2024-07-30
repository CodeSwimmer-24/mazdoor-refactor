import React, { useEffect, useState } from "react";
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
  Linking,
} from "react-native";
import {
  MaterialIcons,
  Ionicons,
  FontAwesome6,
  FontAwesome,
} from "@expo/vector-icons";
import colors from "../../../../constants/colors";
import { hostUrl } from "../../../../services";
import { useAuthStore } from "../../../../zustand/authStore";
import Subscription from "../../Profile/Modals/Subscription";
import SuccessAlert from "../../../../components/SuccessAlert";
import FailAlert from "../../../../components/FailAlert";

const BookingModal = ({
  bookingIsVisible,
  setBookingVisible,
  shortProfile,
  serviceProvider,
  navigation,
}) => {
  const [loading, setLoading] = useState(false);
  const { name, email } = useAuthStore((state) => ({
    name: state.name,
    email: state.email,
  }));
  const [alertVisible, setAlertVisible] = useState(false);
  const [failAlertVisible, setFailAlertVisible] = useState(false);
  const [subscribe, setSubscribe] = useState(false);

  const [subscriptionModalVisible, setSubscriptionModalVisible] =
    useState(false);

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
          userEmailId: email,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      const alredyBooked = result.existingBooking;

      if (alredyBooked === true) {
        setFailAlertVisible(true);
      } else {
        setAlertVisible(true);
        setBookingVisible(false);
      }
    } catch (error) {
      console.error("Error making booking:", error);
      Alert.alert("Booking Failed", "There was an error with your booking.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${hostUrl}/mazdoor/v1/getUserSubscription?emailId=${email}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result, email);
        if (result === true) {
          setSubscribe(true);
        } else {
          setSubscribe(false);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const openWhatsApp = (number) => {
    Linking.openURL(`whatsapp://send?phone=${number}`).catch((err) =>
      Alert.alert("Error", "WhatsApp is not installed on your device.")
    );
  };

  const makeCall = (number) => {
    Linking.openURL(`tel:${number}`).catch((err) =>
      Alert.alert("Error", "Phone dialer is not available on your device.")
    );
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
                  <View style={styles.detailBox}>
                    <View style={{ flexDirection: "row" }}>
                      <Ionicons name="call-outline" size={20} color="gray" />
                      {subscribe ? (
                        <Text style={styles.detailText}>
                          +91 {shortProfile.contactNo}
                        </Text>
                      ) : (
                        <Text style={styles.detailText}>+91 **********</Text>
                      )}
                    </View>
                    <TouchableOpacity>
                      <FontAwesome6 name="copy" size={18} color="gray" />
                    </TouchableOpacity>
                  </View>
                  {subscribe && (
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
                          {shortProfile.address?.region},{" "}
                          {shortProfile.address.city}
                        </Text>
                      </View>
                    </View>
                  )}
                </View>
              </View>

              {subscribe && (
                <View
                  style={[
                    styles.buttonContainer,
                    {
                      marginBottom: 20,
                    },
                  ]}
                >
                  <TouchableOpacity
                    onPress={() => makeCall(shortProfile.contactNo)}
                    style={[
                      styles.button,
                      styles.callButton,
                      { width: "48%", borderRadius: 50, elevation: 0 },
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
                    onPress={() => openWhatsApp(shortProfile.contactNo)}
                    style={[
                      styles.button,
                      styles.whatsappButton,
                      { width: "48%", borderRadius: 50, elevation: 0 },
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
              )}
              {subscribe === false && (
                <View style={styles.oppsContainer}>
                  <View
                    style={[
                      styles.oppsContainer,
                      {
                        width: "80%",
                      },
                    ]}
                  >
                    <Text
                      style={{
                        fontSize: 39,
                        fontWeight: "600",
                        color: colors.baseColor,
                      }}
                    >
                      OPPS!
                    </Text>
                    <Text
                      style={{
                        textAlign: "center",
                        marginTop: 20,
                        color: "gray",
                      }}
                    >
                      No subscription found, please checout the plans and
                      subscribe to our services
                    </Text>
                  </View>
                </View>
              )}
            </ScrollView>
            <View style={styles.buttonContainer}>
              {subscribe ? (
                <TouchableOpacity
                  onPress={handleBooking}
                  style={[styles.button, styles.confirmButton]}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color={colors.white} />
                  ) : (
                    <Text style={[styles.buttonText, { color: colors.white }]}>
                      Confirm Booking
                    </Text>
                  )}
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    setSubscriptionModalVisible(true);
                  }}
                  style={[styles.button, styles.confirmButton]}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color={colors.white} />
                  ) : (
                    <Text style={[styles.buttonText, { color: colors.white }]}>
                      Subscribe a plan
                    </Text>
                  )}
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </Modal>
      <SuccessAlert
        visible={alertVisible}
        message="Your booking has been confirmed!"
        info="Go to Booking page to see details."
        onClose={() => setAlertVisible(false)}
        navigation={navigation}
      />
      <FailAlert
        visible={failAlertVisible}
        message="Already in your Book List"
        info="Go to Booking page to see details."
        onClose={() => setFailAlertVisible(false)}
        navigation={navigation}
      />
      {subscriptionModalVisible && (
        <Subscription
          subscriptionModalVisible={subscriptionModalVisible}
          setSubscriptionModalVisible={setSubscriptionModalVisible}
          name={name}
        />
      )}
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
    height: height * 0.65,
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
    height: 85,
    width: 85,
    borderRadius: 50,
  },
  profileDetails: {
    marginTop: 10,
    alignItems: "center",
  },
  introText: {
    marginTop: 2,
    fontSize: 20,
    fontWeight: "600",
    color: "#505050",
  },
  ageGenderText: {
    marginTop: 2,
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
    justifyContent: "space-between",
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
    width: "100%",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  callButton: {
    backgroundColor: "#4782da1a",
  },
  whatsappButton: {
    backgroundColor: "#4caf501a",
  },
  confirmButton: {
    backgroundColor: colors.primary,
    elevation: 5,
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

export default BookingModal;
