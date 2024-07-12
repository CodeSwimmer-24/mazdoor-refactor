import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
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
    marginTop: hp("2%"),
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: wp("90%"),
    marginBottom: hp("1.25%"),
    marginTop: hp("-0.625%"),
  },
  headerTitle: {
    fontSize: hp("2%"),
    fontWeight: "600",
    color: "#505050",
  },
  seeMoreButton: {
    backgroundColor: "#673de71a",
    paddingVertical: hp("0.625%"),
    paddingHorizontal: wp("2.5%"),
    borderRadius: 50,
  },
  seeMoreText: {
    fontSize: hp("1.5%"),
    fontWeight: "600",
    color: "#673de7",
  },
  bannerImage: {
    height: hp("20%"),
    width: wp("90%"),
    borderRadius: 10,
    objectFit: "cover",
  },
});

export default Banner;
