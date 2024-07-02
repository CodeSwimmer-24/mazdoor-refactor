import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

import electrician from "../../../../assets/assets/electrician.png";
import plumber from "../../../../assets/assets/plumber.png";
import carpenter from "../../../../assets/assets/carpenter.png";
import painter from "../../../../assets/assets/paint-roller.png";
import chef from "../../../../assets/assets/chef.png";
import mechanicCar from "../../../../assets/assets/mechanicCar.png";
import truck from "../../../../assets/assets/truck.png";
import ac from "../../../../assets/assets/ac.png";

const categories = [
  {
    image: electrician,
    label: "Electrician",
    value: "",
    backgroundColor: "rgb(237, 247, 237)",
  },
  {
    image: plumber,
    value: "Plumber",
    label: "Plumber",
    backgroundColor: "rgb(249, 220, 220)",
  },
  {
    image: carpenter,
    value: "Carpenter",
    label: "Carpenter",
    backgroundColor: "#fff4e5",
  },
  {
    image: painter,
    value: "",
    label: "Painter",
    backgroundColor: "rgb(229, 246, 253)",
  },
  {
    image: chef,
    value: "",
    label: "Cook",
    backgroundColor: "rgb(229, 246, 253)",
  },
  {
    image: mechanicCar,
    label: "Mechanic",
    value: "",
    backgroundColor: "rgb(229, 246, 253)",
  },
  {
    image: ac,
    label: "AC Reapir",
    value: "",
    backgroundColor: "rgb(229, 246, 253)",
  },
  {
    image: truck,
    label: "Auto",
    value: "",
    backgroundColor: "rgb(229, 246, 253)",
  },
];

const CategoryItem = ({ imageSource, label, backgroundColor, navigation }) => (
  <TouchableOpacity
    style={styles.categoryItem}
    onPress={() => navigation.push("CategoryDetail", {
      label
    })}
  >
    <View style={[styles.categoryIconContainer, { backgroundColor }]}>
      <Image source={imageSource} style={styles.categoryIcon} />
    </View>
    <Text style={styles.categoryLabel}>{label}</Text>
  </TouchableOpacity>
);

const Category = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Categories</Text>
        <TouchableOpacity style={styles.seeMoreButton}>
          <Text style={styles.seeMoreText}>See All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.categoryContainer}>
        {categories.map((category, index) => (
          <CategoryItem
            key={index}
            imageSource={category.image}
            label={category.label}
            backgroundColor={category.backgroundColor}
            navigation={navigation}
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
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 50,
  },
  seeMoreText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#673de7",
  },
  categoryContainer: {
    marginTop: 0,
    width: "98%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  categoryItem: {
    flexDirection: "column",
    alignItems: "center",
    width: "22%", // Adjust the width as needed to fit four items per row
    marginVertical: 10,
  },
  categoryIconContainer: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 50,
  },
  categoryIcon: {
    height: 32,
    width: 32,
  },
  categoryLabel: {
    marginTop: 5,
    color: "#505050",
    fontSize: 11,
    fontWeight: "500",
    textAlign: "center", // Center the text
  },
});

export default Category;
