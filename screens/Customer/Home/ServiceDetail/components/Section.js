import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import colors from "../../../../../constants/colors";
import { FontAwesome } from "@expo/vector-icons";

const Section = ({ services, feedbackList, shortProfile }) => {
  const [activeTab, setActiveTab] = useState("services");

  const renderScreen = () => {
    switch (activeTab) {
      case "services":
        return <ServicesScreen services={services} />;
      case "rating":
        return <RatingScreen feedbackList={feedbackList} />;
      case "profile":
        return (
          <ProfileScreen services={services} shortProfile={shortProfile} />
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
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
        <TouchableOpacity
          style={[styles.tab, activeTab === "profile" && styles.activeTab]}
          onPress={() => setActiveTab("profile")}
        >
          <Text style={styles.tabText}>Profile</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>{renderScreen()}</View>
    </View>
  );
};

const ServicesScreen = ({ services }) => (
  <ScrollView contentContainerStyle={styles.content}>
    {services?.map((item, index) => {
      return (
        <View key={index} style={styles.subContainer}>
          <View style={{ width: "80%" }}>
            <Text style={styles.serviceName}>{item.serviceName}</Text>
            <Text style={styles.serviceDescription}>
              {item.serviceDescription}
            </Text>
            <Text style={styles.workingHours}>{item.workingHours}</Text>
          </View>
          <Text style={styles.price}>₹ {item.price}</Text>
        </View>
      );
    })}

    {/* Add more service items here if needed */}
  </ScrollView>
);

const RatingScreen = ({ feedbackList }) => (
  <ScrollView contentContainerStyle={styles.content}>
    {feedbackList?.map((item, index) => (
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
    ))}
  </ScrollView>
);

const ProfileScreen = ({ shortProfile }) => (
  <ScrollView contentContainerStyle={styles.content}>
    <View style={styles.profileContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: "https://cdn3d.iconscout.com/3d/premium/thumb/project-manager-avatar-10107510-8179533.png",
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.nameText}>{shortProfile.name}</Text>
        <Text style={styles.detailsText}>
          {shortProfile.gender} - {shortProfile.age}
        </Text>
        <Text style={styles.contactText}>+91 {shortProfile.contactNo}</Text>
      </View>
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
    padding: 10,
    borderRadius: 100,
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 100,
  },
  textContainer: {
    marginLeft: 20,
  },
  nameText: {
    fontSize: 20,
    paddingVertical: 5,
    color: "#505050",
    marginLeft: 5,
  },
  detailsText: {
    fontSize: 14,
    paddingVertical: 0,
    color: "gray",
    marginLeft: 5,
  },
  contactText: {
    fontSize: 14,
    paddingVertical: 2,
    color: "gray",
  },
});

export default Section;
