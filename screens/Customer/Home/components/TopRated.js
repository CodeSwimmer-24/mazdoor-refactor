import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons, Fontisto } from "@expo/vector-icons";
import colors from "../../../../constants/colors";

// Sample data for top-rated items
const topRatedData = [
  {
    id: 1,
    name: "Ajay Plumber",
    location: "Shahenn Bagh, Delhi",
    category: "Plumber",
    rating: 4,
    price: 200,
  },
  {
    id: 2,
    name: "Vijay Electrician",
    location: "Connaught Place, Delhi",
    category: "Electrician",
    rating: 1,
    price: 400,
  },
  {
    id: 3,
    name: "Vijay Electrician",
    location: "Connaught Place, Delhi",
    category: "Electrician",
    rating: 2,
    price: 890,
  },
  {
    id: 4,
    name: "Vijay Electrician",
    location: "Connaught Place, Delhi",
    category: "Electrician",
    rating: 3,
    price: 650,
  },
  {
    id: 5,
    name: "Vijay Electrician",
    location: "Connaught Place, Delhi",
    category: "Electrician",
    rating: 5,
    price: 780,
  },
];

const TopRated = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Top Rated</Text>
        <TouchableOpacity style={styles.seeMoreButton}>
          <Text style={styles.seeMoreText}>See All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.itemContainer}>
        {topRatedData.map((item) => (
          <TouchableOpacity key={item.id} style={styles.item}>
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <View style={styles.locationContainer}>
                <MaterialIcons name="location-pin" size={20} color="#A9A9A9" />
                <Text style={styles.locationText}>{item.location}</Text>
              </View>
              <View style={styles.detailsContainer}>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryText}>{item.category}</Text>
                </View>
                <View style={styles.ratingContainer}>
                  {[...Array(item.rating)].map((_, index) => (
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
              <Text style={styles.priceText}>₹ {item.price}</Text>
              <Text style={styles.basePriceText}>Base price</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#505050",
  },
  seeMoreButton: {
    backgroundColor: "#673de71a",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 50,
  },
  seeMoreText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#673de7",
  },
  itemContainer: {
    width: "90%",
    marginTop: 10,
  },
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
    fontWeight: "500",
    fontSize: 20,
    color: colors.baseColor,
  },
  basePriceText: {
    fontWeight: "200",
    fontSize: 10,
    color: colors.primary,
    textAlign: "center",
  },
});

export default TopRated;
