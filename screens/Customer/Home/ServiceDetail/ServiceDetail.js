import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Details from "./components/Details";
import Section from "./components/Section";
import colors from "../../../../constants/colors";
import BannerImage from "./components/Image";
import { hostUrl } from "../../../../services";

const ServiceDetail = ({ route }) => {
  const { emailId } = route.params;
  const [feedbackList, setFeedbackList] = useState([]);
  const [rating, setRating] = useState(0);
  const [serviceProvider, setServiceProvider] = useState({});
  const [services, setServices] = useState([]);
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

  return (
    <View
      style={{
        height: "100%",
        backgroundColor: colors.white,
      }}
    >
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
      <View>
        <View>
          <TouchableOpacity>
            <Text>Message</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity>
            <Text>Booking</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ServiceDetail;
