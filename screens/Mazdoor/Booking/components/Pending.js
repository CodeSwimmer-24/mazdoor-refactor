import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import NotFound from "../../../../components/NotFound";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { useAuthStore } from "../../../../zustand/authStore";
import { hostUrl } from "../../../../services/index";
import axios from "axios";
import colors from "../../../../constants/colors";

const Pending = () => {
  const { email } = useAuthStore();

  const [data, setData] = useState(null);
  const [userInfo, setUserInfo] = useState([]);
  const [bookingInfo, setBookingInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rejecting, setRejecting] = useState(false);
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    axios
      .get(
        `${hostUrl}/mazdoor/v1/getActiveSPBookings?emailId=${email}&status=pending`
      )
      .then((response) => {
        setData(response.data);
        if (response.data.length > 0) {
          response.data.map((info) => setUserInfo(info.myProfile));
          response.data.map((info) => setBookingInfo(info.booking));
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [rejecting, confirm]);

  const rejectBooking = (bookingId) => {
    setRejecting(true);
    Alert.alert(
      "Reject Booking",
      "Are you sure you want to reject this booking?",
      [
        {
          text: "Cancel",
          onPress: () => setRejecting(false),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            axios
              .put(
                `${hostUrl}/mazdoor/v1/updateBookingStatus?bookingId=${bookingId}&status=Rejected`
              )
              .then((response) => {
                console.log(response);

                setRejecting(false);
              })
              .catch((error) => {
                console.log(error);
                setRejecting(false);
              });
          },
        },
      ]
    );
  };
  const confirmBooking = (bookingId) => {
    setConfirm(true);
    Alert.alert(
      "Confirm Booking",
      "Are you sure you want to confirm this Booking?",
      [
        {
          text: "Cancel",
          onPress: () => setConfirm(false),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            axios
              .put(
                `${hostUrl}/mazdoor/v1/updateBookingStatus?bookingId=${bookingId}&status=Confirmed`
              )
              .then((response) => {
                console.log(response);

                setConfirm(false);
              })
              .catch((error) => {
                console.log(error);
                setConfirm(false);
              });
          },
        },
      ]
    );
  };

  const handleCall = (number) => {
    let phoneNumber = `tel:${number}`;
    Linking.openURL(phoneNumber).catch(() =>
      Alert.alert("Error", "Failed to make a call")
    );
  };

  const handleWhatsApp = (number) => {
    let url = `whatsapp://send?phone=${number}`;
    Linking.openURL(url).catch(() =>
      Alert.alert("Error", "WhatsApp is not installed on this device")
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (data && data.length === 0) {
    return (
      <View style={styles.notFoundContainer}>
        <NotFound info="No bookings found in your pending list." />
      </View>
    );
  }

  return (
    <View style={{ marginTop: 20 }}>
      {data !== null ? (
        <View style={styles.container}>
          <View style={styles.card}>
            <View style={styles.body}>
              <View style={styles.bodyLeft}>
                <Image
                  source={{
                    uri: "https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1721001600&semt=ais_user",
                  }}
                  style={styles.profileImage}
                />
                <View style={styles.bodyTextContainer}>
                  <Text style={styles.bodyTitle}>
                    {userInfo.name}
                    <Text style={styles.genderText}>
                      ({userInfo.gender}ale)
                    </Text>
                  </Text>
                  <Text style={styles.bodySubtitle}>
                    {userInfo?.address?.locality},{" "}
                    {userInfo?.address?.exactLocation}
                  </Text>
                  <Text style={styles.bodySubtitle}>{bookingInfo?.date}</Text>
                </View>
              </View>
              <View style={styles.bodyRight}>
                <TouchableOpacity
                  onPress={() => handleCall(userInfo?.contactNo)}
                >
                  <MaterialIcons
                    name="call"
                    size={24}
                    color={colors.primary}
                    style={styles.icon}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleWhatsApp(userInfo?.contactNo)}
                >
                  <FontAwesome5
                    name="whatsapp"
                    size={24}
                    color="#075e54"
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.footer}>
              <TouchableOpacity
                onPress={() => rejectBooking(bookingInfo.bookingId)}
                style={styles.rejectButton}
              >
                {rejecting ? (
                  <ActivityIndicator size="small" color={colors.danger} />
                ) : (
                  <Text style={styles.rejectText}>Reject</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => confirmBooking(bookingInfo.bookingId)}
                style={styles.acceptButton}
              >
                {confirm ? (
                  <ActivityIndicator size="small" color="#4caf50" />
                ) : (
                  <Text style={styles.acceptText}>Accept</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.notFoundContainer}>
          <NotFound info="No bookings found in your pending list." />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "75%",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  card: {
    width: "90%",
    backgroundColor: "white",
    elevation: 5,
    borderRadius: 6,
  },
  body: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  bodyLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    height: 35,
    width: 35,
    borderRadius: 50,
  },
  bodyTextContainer: {
    marginLeft: 12,
  },
  bodyTitle: {
    fontWeight: "600",
    fontSize: 16,
  },
  genderText: {
    fontSize: 12,
    fontWeight: "300",
    color: colors.baseColor,
  },
  bodySubtitle: {
    fontSize: 12,
    marginTop: 2,
    color: "gray",
  },
  bodyRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 20,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  rejectButton: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    backgroundColor: colors.dangerBackground,
    marginRight: 10,
    borderRadius: 10,
  },
  rejectText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.danger,
  },
  acceptButton: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    backgroundColor: "#4caf502a",
    borderRadius: 10,
  },
  acceptText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4caf50",
  },
  notFoundContainer: {
    marginTop: 100,
  },
});

export default Pending;
