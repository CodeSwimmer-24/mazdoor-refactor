import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import colors from "../../../../constants/colors";
import ServiceCard from "../../../../components/ServiceCard";

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
          <ServiceCard
            key={item.id}
            id={item.id}
            name={item.name}
            category={item.category}
            price={item.price}
            location={item.location}
            rating={item.rating}
          />
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
});

export default TopRated;
