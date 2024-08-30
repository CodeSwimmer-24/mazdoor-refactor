import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import colors from "../../constants/colors";
import { MaterialCommunityIcons, Fontisto } from "@expo/vector-icons";

const ServiceCard = ({
  id,
  name,
  location,
  category,
  rating,
  price,
  onPress,
  availability,
}) => {
  return (
    <TouchableOpacity onPress={onPress} key={id} style={styles.item}>
      <View>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.locationContainer}>
          <MaterialCommunityIcons
            name="account-details"
            size={20}
            color="#A9A9A9"
            style={styles.icon}
          />
          <Text style={styles.locationText}>{location.slice(0, 40)}...</Text>
        </View>
        <View style={styles.detailsContainer}>
          <View
            style={[
              styles.availabilityBadge,
              availability ? styles.available : styles.notAvailable,
            ]}
          >
            <Text
              style={[
                styles.availabilityText,
                availability ? styles.availableText : styles.notAvailableText,
              ]}
            >
              {availability ? "Available" : "Not Available"}
            </Text>
          </View>

          <View style={styles.ratingContainer}>
            {[...Array(rating)].map((_, index) => (
              <Fontisto
                key={index}
                name="star"
                size={13}
                color="#673de7"
                style={styles.starIcon}
              />
            ))}
          </View>
        </View>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.priceText}>₹ {price}</Text>
        <Text style={styles.basePriceText}>Base price</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#FFF",
    elevation: 3,
    borderColor: "#F8F8F8",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    paddingVertical: 2,
    paddingHorizontal: 4,
    fontSize: 16,
    fontWeight: "500",
    color: "#505050",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
    width: "80%",
  },
  icon: {
    marginRight: 5,
  },
  locationText: {
    color: "#A9A9A9",
  },
  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },
  availabilityBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  available: {
    backgroundColor: "#4caf501a",
  },
  notAvailable: {
    backgroundColor: colors.dangerBackground,
  },
  availabilityText: {
    fontSize: 10,
    fontWeight: "600",
  },
  availableText: {
    color: "#4caf50",
  },
  notAvailableText: {
    color: colors.danger,
  },
  ratingContainer: {
    flexDirection: "row",
    marginLeft: 6,
  },
  starIcon: {
    paddingHorizontal: 3,
  },
  priceContainer: {
    paddingHorizontal: 0,
    alignItems: "center",
  },
  priceText: {
    fontWeight: "600",
    fontSize: 18,
    color: colors.baseColor,
  },
  basePriceText: {
    fontWeight: "300",
    fontSize: 10,
    color: colors.primary,
    textAlign: "center",
  },
});

export default ServiceCard;
