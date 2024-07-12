import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import categories from "../../../../constants/categories";

const CategoryItem = ({ imageSource, label, backgroundColor, navigation }) => (
  <TouchableOpacity
    style={styles.categoryItem}
    onPress={() =>
      navigation.push("CategoryDetail", {
        label,
      })
    }
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
    marginTop: hp("2%"),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: wp("90%"),
  },
  headerTitle: {
    fontSize: hp("2%"),
    fontWeight: "600",
    color: "#505050",
  },
  seeMoreButton: {
    backgroundColor: "#673de71a",
    paddingVertical: hp("0.5%"),
    paddingHorizontal: wp("2.5%"),
    borderRadius: 50,
  },
  seeMoreText: {
    fontSize: hp("1.5%"),
    fontWeight: "600",
    color: "#673de7",
  },
  categoryContainer: {
    marginTop: 0,
    width: wp("98%"),
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingBottom: hp("8.75%"),
  },
  categoryItem: {
    flexDirection: "column",
    alignItems: "center",
    width: wp("22%"),
    marginVertical: hp("1.25%"),
  },
  categoryIconContainer: {
    paddingVertical: hp("1.2%"),
    paddingHorizontal: wp("2.6%"),
    borderRadius: 50,
  },
  categoryIcon: {
    height: hp("3.7%"), // Decreased height
    width: wp("7.4%"), // Decreased width
  },
  categoryLabel: {
    marginTop: hp("0.625%"),
    color: "#505050",
    fontSize: hp("1.375%"),
    fontWeight: "500",
    textAlign: "center",
  },
});

export default Category;
