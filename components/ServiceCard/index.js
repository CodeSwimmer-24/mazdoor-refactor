import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import colors from "../../constants/colors";
import { MaterialIcons, Fontisto } from "@expo/vector-icons";

const ServiceCard = ({ id, name, location, category, rating, price }) => {
  return (
    <TouchableOpacity key={id} style={styles.item}>
      <View>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.locationContainer}>
          <MaterialIcons name="location-pin" size={20} color="#A9A9A9" />
          <Text style={styles.locationText}>{location}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{category}</Text>
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
  },
  locationText: {
    color: "#A9A9A9",
  },
  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },
  categoryBadge: {
    paddingHorizontal: 12,
    backgroundColor: "#673de71a",
    width: "auto",
    paddingVertical: 4,
    borderRadius: 100,
    alignItems: "center",
  },
  categoryText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.primary,
  },
  ratingContainer: {
    flexDirection: "row",
    marginLeft: 6,
  },
  starIcon: {
    paddingHorizontal: 3,
  },
  priceContainer: {
    paddingHorizontal: 20,
    alignItems: "center",
  },
  priceText: {
    fontWeight: "600",
    fontSize: 20,
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
