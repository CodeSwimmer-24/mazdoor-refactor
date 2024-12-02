import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  Entypo,
  FontAwesome,
  Feather,
  MaterialIcons,
} from "@expo/vector-icons";
import axios from "axios";
import colors from "../../../../../../constants/colors";
import { getFavoriteSPs, hostUrl } from "../../../../../../services";
import { useAuthStore } from "../../../../../../zustand/authStore";
import { useCustomerStore } from "../../../../../../zustand/customerStore";

const Details = ({ serviceProvider, shortProfile, rating }) => {
  const { email } = useAuthStore((state) => ({ email: state.email }));
  const { favoriteSps, setFavoriteSps } = useCustomerStore();

  const [isFav, setIsFav] = useState(false);

  const area = shortProfile?.address?.area || "Unknown Area";
  const locality = shortProfile?.address?.locality || "Unknown Locality";
  const exactLocation =
    shortProfile?.address?.exactLocation || "Exact Location";

  useEffect(() => {
    if (serviceProvider?.emailId) {
      const existsInFav = favoriteSps.some(
        (sp) => sp.serviceProvider.emailId === serviceProvider.emailId
      );
      setIsFav(existsInFav);
    }
  }, [serviceProvider]);

  const addToFavourites = async () => {
    if (!isFav) {
      try {
        const result = await axios.post(`${hostUrl}/mazdoor/v1/addFavoriteSP`, {
          spEmailId: serviceProvider.emailId,
          userEmailId: email,
        });

        if (result.status === 200) {
          setIsFav(true);
          getFavoriteSPs(email)
            .then((sps) => setFavoriteSps(sps))
            .catch((err) => console.log(err));
        }
      } catch (error) {
        console.log(error.response.data);
      }
    } else {
      console.log("Already in favourites");
    }
  };

  // Split the rating into integer and fractional parts
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.shopTitle}>{serviceProvider.title}</Text>
          {/* <Text style={styles.shopDescription}>
            {serviceProvider.short_description
              ? `${serviceProvider.short_description.slice(0, 50)}...`
              : "NO Description found..."}
          </Text> */}
        </View>
        <TouchableOpacity style={styles.favButton} onPress={addToFavourites}>
          {isFav ? (
            <MaterialIcons name="bookmark" size={26} color={colors.primary} />
          ) : (
            <Feather name="bookmark" size={24} color={colors.primary} />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.tagAndLocationContainer}>
        <View style={styles.tagContainer}>
          <Text style={styles.tagText}>{serviceProvider.serviceType}</Text>
        </View>
        <View style={styles.locationContainer}>
          <Entypo name="location-pin" size={26} color={colors.primary} />
          <Text style={styles.locationText}>
            {exactLocation}, {locality}
          </Text>
        </View>
      </View>
      <View style={styles.ratingContainer}>
        <View style={styles.ratingStars}>
          {[...Array(fullStars)].map((_, index) => (
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
            {serviceProvider ? "Available" : "Un-Available"}
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
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoContainer: {
    width: "80%",
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
  favButton: {
    marginTop: 10,
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
    paddingRight: 20,
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
