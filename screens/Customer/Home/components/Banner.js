import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import colors from "../../../../constants/colors";

const Banner = () => {
  return (
    <View style={styles.bannerContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Promotions</Text>
        <TouchableOpacity style={styles.seeMoreButton}>
          <Text style={styles.seeMoreText}>See All</Text>
        </TouchableOpacity>
      </View>
      <Image
        style={styles.bannerImage}
        source={{
          uri: "https://previews.123rf.com/images/mcandy/mcandy1609/mcandy160900031/64232823-big-sale-banner-with-bright-ink-blue-color-blots-over-white-background-each-element-separate-on.jpg",
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginBottom: 10,
    marginTop: -5,
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
  bannerImage: {
    height: 160,
    width: "90%",
    borderRadius: 10,
    objectFit: "cover",
  },
});

export default Banner;
