import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
} from "react-native";
import Details from "./components/Details";
import Section from "./components/Section";
import colors from "../../../../../constants/colors";
import BannerImage from "./components/Image";
import { hostUrl } from "../../../../../services";
import BookingModal from "../../../Booking/BookingModal/BookingModal";

const ServiceDetail = ({ route, navigation }) => {
  const { emailId } = route.params;
  const [feedbackList, setFeedbackList] = useState([]);
  const [rating, setRating] = useState(0);
  const [serviceProvider, setServiceProvider] = useState({});
  const [services, setServices] = useState([]);
  const [bookingIsVisible, setBookingVisible] = useState(false);
  const [shortProfile, setShortProfile] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${hostUrl}/mazdoor/v1/getServiceProviderDetails?emailId=${emailId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        setFeedbackList(data.feedbackList || []);
        setRating(data.rating || 0);
        setServiceProvider(data.serviceProvider || {});
        setServices(data.services || []);
        setShortProfile(data.shortProfile || {});
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [emailId]);

  useEffect(() => {
    const parent = navigation.getParent();

    parent?.setOptions({
      tabBarStyle: { display: "none" },
    });
  }, [navigation]);

  useEffect(() => {
    const backAction = () => {
      if (bookingIsVisible === true) {
        setBookingVisible(false);
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => {
      backHandler.remove();
    };
  }, [bookingIsVisible]);

  return (
    <View style={styles.container}>
      <BannerImage />
      <Details
        rating={rating}
        serviceProvider={serviceProvider}
        shortProfile={shortProfile}
      />
      <Section
        services={services}
        feedbackList={feedbackList}
        shortProfile={shortProfile}
        serviceProvider={serviceProvider}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            setBookingVisible(true);
          }}
          style={[styles.button, styles.bookButton]}
        >
          <Text style={[styles.buttonText, styles.bookButtonText]}>
            Book Now
          </Text>
        </TouchableOpacity>
      </View>
      <BookingModal
        bookingIsVisible={bookingIsVisible}
        setBookingVisible={setBookingVisible}
        shortProfile={shortProfile}
        serviceProvider={serviceProvider}
        navigation={navigation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: "center",
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    width: "95%",
    backgroundColor: colors.secondary,
    borderRadius: 50,
    alignItems: "center",
  },
  bookButton: {
    backgroundColor: colors.primary,
    elevation: 4,
  },
  buttonText: {
    textAlign: "center",
    paddingVertical: 14,
    fontSize: 14,
    color: colors.primary,
    fontWeight: "600",
  },
  bookButtonText: {
    color: colors.white,
  },
});

export default ServiceDetail;
