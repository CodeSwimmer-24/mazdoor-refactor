import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import colors from "../../../../../../constants/colors";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

const Section = ({ services, feedbackList, shortProfile, serviceProvider }) => {
  const [activeTab, setActiveTab] = useState("profile");

  const renderScreen = () => {
    switch (activeTab) {
      case "services":
        return <ServicesScreen services={services} />;
      case "rating":
        return <RatingScreen feedbackList={feedbackList} />;
      case "profile":
        return (
          <ProfileScreen
            services={services}
            shortProfile={shortProfile}
            serviceProvider={serviceProvider}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "profile" && styles.activeTab]}
          onPress={() => setActiveTab("profile")}
        >
          <Text style={styles.tabText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "services" && styles.activeTab]}
          onPress={() => setActiveTab("services")}
        >
          <Text style={styles.tabText}>Services</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "rating" && styles.activeTab]}
          onPress={() => setActiveTab("rating")}
        >
          <Text style={styles.tabText}>Rating</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>{renderScreen()}</View>
    </View>
  );
};

const ServicesScreen = ({ services }) => (
  <ScrollView contentContainerStyle={styles.content}>
    {services && services.length > 0 ? (
      services.map((item, index) => {
        return (
          <View key={index} style={styles.subContainer}>
            <View style={{ width: "80%", flexDirection: "row" }}>
              <Text
                style={{
                  marginRight: 10,
                  fontSize: 14,
                  fontWeight: "600",
                  color: colors.primary,
                  marginBottom: 20,
                }}
              >
                {index + 1}.
              </Text>
              <Text style={styles.serviceName}>{item.serviceName}</Text>
              {/* <Text style={styles.serviceDescription}>
                {item.serviceDescription}
              </Text> */}
              <Text style={styles.workingHours}>{item.workingHours}</Text>
            </View>
            {/* <Text style={styles.price}>₹ {item.price}</Text> */}
          </View>
        );
      })
    ) : (
      <Text style={styles.noDataText}>No services found</Text>
    )}
  </ScrollView>
);

const RatingScreen = ({ feedbackList }) => (
  <ScrollView contentContainerStyle={styles.content}>
    {feedbackList && feedbackList.length > 0 ? (
      feedbackList.map((item, index) => (
        <View key={index} style={styles.subContainer}>
          <View style={{ width: "80%" }}>
            <Text style={styles.serviceName}>{item.userName}</Text>
            <Text style={styles.feedback}>{item.feedback}</Text>
          </View>
          <View style={styles.ratingContainer}>
            <FontAwesome name="star" size={14} color={colors.primary} />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
      ))
    ) : (
      <Text style={styles.noDataText}>No ratings found</Text>
    )}
  </ScrollView>
);

const ProfileScreen = ({ shortProfile, serviceProvider }) => (
  <ScrollView contentContainerStyle={styles.content}>
    <View style={styles.profileContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: "https://previews.123rf.com/images/jemastock/jemastock1911/jemastock191114276/133601522-construction-worker-avatar-profile-vector-illustration-graphic-design.jpg",
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.nameText}>{shortProfile.name}</Text>
        <Text style={styles.detailsText}>
          Gender - {shortProfile.gender}ale
        </Text>
        <Text style={styles.contactText}>
          Age - {shortProfile.age} year's old
        </Text>
      </View>
    </View>
    <View style={styles.locationContainer}>
      <MaterialIcons name="location-pin" size={30} color="#c8c8c8" />
      <Text style={styles.locationText}>
        {shortProfile.address?.buildingAddress},{" "}
        {shortProfile.address?.exactLocation}, {shortProfile.address?.locality},{" "}
        {shortProfile.address?.area} {shortProfile.address?.region} Delhi
      </Text>
    </View>
    <View style={styles.profileDesc}>
      {/* <Text style={styles.aboutMe}>Note:</Text> */}
      {/* <Text style={styles.aboutInfo}>
        The rates for different types of work may vary between services and
        service providers. It is essential to discuss and negotiate these rates
        directly with the service provider to ensure they are set according to
        our convenience and agreement.
      </Text> */}
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  tabsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "95%",
    backgroundColor: "#fff",
    marginTop: 20,
  },
  tab: {
    alignItems: "center",
    width: "31.6%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.primary,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  contentContainer: {
    flex: 1,
    width: "90%",
    marginTop: 20,
    backgroundColor: "#fff",
  },
  content: {},
  text: {
    textAlign: "left",
    fontSize: 18,
    fontWeight: "600",
    color: colors.primary,
  },
  serviceName: {
    fontSize: 16,
    color: "#505050",
    fontWeight: "500",
  },
  serviceDescription: {
    fontSize: 13,
    color: "#505050",
    paddingVertical: 2,
  },
  workingHours: {
    fontSize: 12,
    color: "#505050",
    paddingVertical: 2,
    marginBottom: 5,
  },
  price: {
    fontSize: 18,
    color: colors.primary,
    alignItems: "center",
  },
  subContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "lightgray",
    marginBottom: 20,
  },
  feedback: {
    marginTop: 5,
    marginBottom: 10,
    color: "gray",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.secondary,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  ratingText: {
    fontSize: 16,
    marginLeft: 5,
    fontWeight: "600",
    color: colors.primary,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    borderWidth: 2,
    borderColor: "lightgray",
    borderRadius: 100,
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 100,
  },
  textContainer: {
    marginLeft: 20,
  },
  nameText: {
    fontSize: 20,
    paddingVertical: 5,
    color: "#505050",
  },
  detailsText: {
    fontSize: 14,
    paddingVertical: 0,
    color: "gray",
  },
  contactText: {
    fontSize: 14,
    paddingVertical: 2,
    color: "gray",
  },
  profileDesc: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  aboutMe: {
    paddingBottom: 10,
    fontWeight: "600",
    fontSize: 18,
    color: "#505050",
  },
  locationContainer: {
    width: "80%",
    paddingTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontSize: 14,
    color: "gray",
    marginLeft: 5,
  },
  aboutInfo: {
    fontSize: 13,
    color: "#376fd0",
    paddingRight: 10,
    lineHeight: 18,
    fontWeight: "300",
  },
  noDataText: {
    textAlign: "center",
    fontSize: 16,
    color: "gray",
    marginTop: 20,
  },
});

export default Section;
