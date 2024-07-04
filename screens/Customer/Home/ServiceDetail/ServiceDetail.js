import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Details from "./components/Details";
import Section from "./components/Section";
import colors from "../../../../constants/colors";
import BannerImage from "./components/Image";
import { hostUrl } from "../../../../services";
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import BookingModal from "../../Booking/BookingModal/BookingModal";

const ServiceDetail = ({ route }) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
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

  console.log(serviceProvider.emailId);

  useFocusEffect(
    useCallback(() => {
      const parent = navigation.getParent();
      parent?.setOptions({
        tabBarStyle: { display: "none" },
      });

      return () => {
        parent?.setOptions({
          tabBarStyle: { display: "flex" },
        });
      };
    }, [isFocused, navigation])
  );

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
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Message</Text>
        </TouchableOpacity>

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
    justifyContent: "space-between",
  },
  button: {
    width: "48%",
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
