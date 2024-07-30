import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import colors from "../../../constants/colors";
import Card from "./Cards/Card";
import { useAuthStore } from "../../../zustand/authStore";
import { hostUrl } from "../../../services";
import NotFound from "../../../components/NotFound";
import {
  useFocusEffect,
  useIsFocused,
  CommonActions,
} from "@react-navigation/native";
import { getTabBarOptions } from "../../../constants/tabBarStyles";

const Booking = ({ navigation }) => {
  const isFocused = useIsFocused();

  const [bookings, setBookings] = useState([]);
  const [serviceProviders, setServiceProviders] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noData, setNoData] = useState(true);
  const [reload, setReload] = useState(false);
  const email = useAuthStore((state) => state.email);

  useEffect(() => {
    if (isFocused) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "HomeMain" }],
        })
      );
    }
  }, [isFocused]);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(
        `${hostUrl}/mazdoor/v1/getActiveUserBookings?emailId=${email}`
      );
      const bookingData = response.data;
      if (bookingData.length > 0) {
        setNoData(false);
        setBookings(bookingData.map((item) => item.booking));
        setServiceProviders(bookingData.map((item) => item.serviceProvider));
        setProfiles(bookingData.map((item) => item.myProfile));
      } else {
        setNoData(true);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchBookings();
    }, [email])
  );

  useEffect(() => {
    if (reload) {
      fetchBookings();
      setReload(false); // Reset the reload state to avoid continuous reloading
    }
  }, [reload]);

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar backgroundColor="#f9f9f9" />
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>My Bookings</Text>
        <Text style={styles.subHeaderText}>You can view last 10 bookings.</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.bookingsContainer}>
          {!noData &&
            bookings.map((booking, index) => (
              <Card
                key={booking.bookingId}
                name={profiles[index]?.name || "Unknown"}
                email={profiles[index]?.emailId}
                age={profiles[index]?.age || "N/A"}
                gender={profiles[index]?.gender === "F" ? "Female" : "Male"}
                profession={serviceProviders[index]?.serviceType || "N/A"}
                shopName={serviceProviders[index]?.title || "N/A"}
                date={`${booking.date} - ${booking.time}`}
                contactNo={profiles[index]?.contactNo || "7272977850"}
                bookingId={bookings[index]?.bookingId || "NoID"}
                location={
                  `${profiles[index]?.address?.locality}, ${profiles[index]?.address?.city}` ||
                  "N/A"
                }
                imageUrl={
                  "https://previews.123rf.com/images/jemastock/jemastock1911/jemastock191114276/133601522-construction-worker-avatar-profile-vector-illustration-graphic-design.jpg"
                }
                status={booking.status}
                navigation={navigation}
                setReload={setReload}
              />
            ))}
        </View>
        {noData && (
          <>
            <NotFound info="No current booking found for you" />
            <View style={styles.noDataTextContainer}>
              <View style={styles.bookServiceButton}>
                <Entypo name="plus" size={20} color={colors.primary} />
                <Text style={styles.bookServiceButtonText}>
                  Book your service
                </Text>
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    backgroundColor: colors.white,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  safeAreaView: {
    backgroundColor: colors.white,
    height: "100%",
  },
  headerContainer: {
    backgroundColor: "#f9f9f9",
    paddingVertical: 16,
    paddingHorizontal: 10,
  },
  headerText: {
    paddingHorizontal: 20,
    fontSize: 20,
    fontWeight: "600",
    color: "#505050",
  },
  subHeaderText: {
    paddingHorizontal: 20,
    paddingTop: 5,
    fontSize: 12,
    fontWeight: "300",
    color: "gray",
  },
  scrollView: {
    backgroundColor: "white",
    marginTop: 20,
    zIndex: 100,
  },
  bookingsContainer: {
    paddingBottom: 60,
  },
  noDataTextContainer: {
    alignItems: "center",
    marginTop: 40,
    justifyContent: "center",
  },
  bookServiceButton: {
    backgroundColor: colors.secondary,
    width: "80%",
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  bookServiceButtonText: {
    textAlign: "center",
    color: colors.primary,
    fontWeight: "600",
    marginLeft: 6,
  },
});

export default Booking;
