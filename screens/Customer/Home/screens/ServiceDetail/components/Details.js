import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Entypo, FontAwesome, Feather, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import colors from "../../../../../../constants/colors";
import { getFavoriteSPs, hostUrl } from "../../../../../../services";
import { useAuthStore } from "../../../../../../zustand/authStore";
import { useCustomerStore } from "../../../../../../zustand/customerStore";

const Details = ({ serviceProvider, shortProfile, rating, verified, visitingCharge }) => {
  const { email } = useAuthStore((state) => ({ email: state.email }));
  const { favoriteSps, setFavoriteSps } = useCustomerStore();

  const [isFav, setIsFav] = useState(false);

  const area = shortProfile?.address?.area || "Unknown Area";
  const locality = shortProfile?.address?.locality || "Unknown Locality";
  const exactLocation = shortProfile?.address?.exactLocation || "Exact Location";

  useEffect(() => {
    if (serviceProvider?.emailId) {
      const existsInFav = favoriteSps.some(
        (sp) => sp.serviceProvider.emailId === serviceProvider.emailId
      );
      setIsFav(existsInFav);
    }
  }, [serviceProvider, favoriteSps]);

  const handleFavoriteToggle = async () => {
    if (!isFav) {
      try {
        const response = await axios.post(`${hostUrl}/mazdoor/v1/addFavoriteSP`, {
          spEmailId: serviceProvider.emailId,
          userEmailId: email,
        });

        if (response.status === 200) {
          setIsFav(true);
          const updatedFavorites = await getFavoriteSPs(email);
          setFavoriteSps(updatedFavorites);
        }
      } catch (error) {
        console.error("Error adding to favorites:", error.response?.data || error);
      }
    } else {
      console.log("Already in favorites");
    }
  };

  // Calculate stars
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.shopTitle}>{serviceProvider.title}</Text>
        </View>
        <TouchableOpacity style={styles.favButton} onPress={handleFavoriteToggle}>
          {isFav ? (
            <MaterialIcons name="bookmark" size={26} color={colors.primary} />
          ) : (
            <Feather name="bookmark" size={24} color={colors.primary} />
          )}
        </TouchableOpacity>
      </View>

      {/* Tag and Location Section */}
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

      {/* Rating and Availability Section */}
      <View style={styles.ratingContainer}>
        {fullStars === 0 ? (
          <View style={styles.noRatingContainer}>
            <FontAwesome name="star" size={16} color={colors.primary} />
            <Text style={styles.noRatingText}>0</Text>
          </View>
        ) : (
          <View style={styles.ratingStars}>
            {[...Array(fullStars)].map((_, index) => (
              <FontAwesome
                key={index}
                name="star"
                size={18}
                color={colors.primary}
                style={styles.starIcon}
              />
            ))}
          </View>
        )}
        <View style={styles.availabilityContainer}>
          <Text style={styles.availabilityText}>
            {serviceProvider ? "Available" : "Un-Available"}
          </Text>
        </View>
      </View>

      {/* Verification and Visiting Charge Section */}
      {verified && (
        <View style={styles.verifiedContainer}>
          <MaterialIcons name="verified" size={24} color="black" />
        </View>
      )}
      <View style={styles.visitingChargeContainer}>
        <Text style={styles.visitingChargeText}>₹ {visitingCharge}</Text>
        <Text style={styles.visitingChargeLabel}>Visiting Charge</Text>
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
  noRatingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.secondary,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 50,
  },
  noRatingText: {
    fontWeight: "600",
    color: colors.primary,
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
  verifiedContainer: {
    marginTop: 10,
  },
  visitingChargeContainer: {
    paddingHorizontal: 5,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  visitingChargeText: {
    fontSize: 22,
    color: colors.primary,
    fontWeight: "600",
  },
  visitingChargeLabel: {
    fontWeight: "200",
    fontSize: 12,
    color: "gray",
    marginLeft: 10,
  },
});

export default Details;
