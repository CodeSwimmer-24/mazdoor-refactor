import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import colors from "../../../../../constants/colors";
import { Feather } from "@expo/vector-icons";

const Details = ({ serviceProvider, shortProfile, rating }) => {
  // Ensure shortProfile and address are defined before accessing nested properties
  const area = shortProfile?.address?.area || "Unknown Area";
  const locality = shortProfile?.address?.locality || "Unknown Locality";

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text style={styles.shopTitle}>{serviceProvider.title}</Text>
          <Text style={styles.shopDescription}>
            {serviceProvider.short_description}
          </Text>
        </View>
        <TouchableOpacity>
          <Feather
            style={{ paddingHorizontal: 10 }}
            name="bookmark"
            size={24}
            color={colors.primary}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.tagAndLocationContainer}>
        <View style={styles.tagContainer}>
          <Text style={styles.tagText}>{serviceProvider.serviceType}</Text>
        </View>
        <View style={styles.locationContainer}>
          <Entypo name="location-pin" size={26} color={colors.primary} />
          <Text style={styles.locationText}>
            {area}, {locality} Delhi
          </Text>
        </View>
      </View>
      <View style={styles.ratingContainer}>
        <View style={styles.ratingStars}>
          {[...Array(rating)].map((_, index) => (
            <FontAwesome
              key={index}
              name="star"
              size={16}
              color={colors.primary}
              style={styles.starIcon}
            />
          ))}
        </View>
        <View style={styles.availabilityContainer}>
          <Text style={styles.availabilityText}>
            {serviceProvider ? "Avalable" : "UnAvalable"}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 0,
    paddingHorizontal: 25,
  },
  shopTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: colors.baseColor,
  },
  shopDescription: {
    fontSize: 12,
    color: "gray",
  },
  tagAndLocationContainer: {
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  tagContainer: {
    backgroundColor: colors.secondary,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  tagText: {
    fontWeight: "600",
    color: colors.primary,
    fontSize: 12,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    color: "gray",
    fontSize: 13,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  ratingStars: {
    flexDirection: "row",
    marginLeft: 10,
  },
  starIcon: {
    marginRight: 5,
  },
  availabilityContainer: {
    marginLeft: 20,
  },
  availabilityText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4caf50",
  },
});

export default Details;
