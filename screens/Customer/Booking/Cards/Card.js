import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import colors from "../../../../constants/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Zocial } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const Card = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <View style={styles.infoSection}>
            <View style={styles.profile}>
              <Image
                source={{
                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR63UM1yuQLSHbj-UHMge8_fMzzanCg2nK45A&s",
                }}
                style={styles.profileImage}
              />
              <View>
                <Text style={styles.name}>Babban Kalal</Text>
                <Text style={styles.age}>32 - Male</Text>
              </View>
              <View style={styles.jobBadge}>
                <Text style={styles.jobText}>Plumber</Text>
              </View>
            </View>
            <View style={styles.shopInfo}>
              <Text style={styles.shopName}>Babban Shop</Text>
              <Text style={styles.dateTime}>26 June - 8:30</Text>
            </View>
            <View style={styles.location}>
              <MaterialIcons name="location-pin" size={24} color="gray" />
              <Text style={styles.locationText}>Shahenn Bagh, Delhi</Text>
            </View>
          </View>
          <View style={styles.actions}>
            <TouchableOpacity style={styles.callButton}>
              <Zocial name="call" size={20} color={colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.whatsappButton}>
              <FontAwesome5 name="whatsapp" size={20} color="#075e54" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "90%",
    backgroundColor: colors.white,
    elevation: 5,
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
  },
  cardContent: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoSection: {
    backgroundColor: "white",
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    height: 40,
    width: 40,
    borderRadius: 50,
  },
  name: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "600",
    color: "#505050",
  },
  age: {
    marginLeft: 10,
    fontSize: 12,
    fontWeight: "300",
    color: colors.baseColor,
  },
  jobBadge: {
    marginLeft: 12,
    width: "auto",
    backgroundColor: "#673de72a",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginBottom: 10,
  },
  jobText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: "600",
  },
  shopInfo: {
    paddingTop: 10,
    paddingHorizontal: 5,
  },
  shopName: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.baseColor,
  },
  dateTime: {
    fontSize: 12,
    fontWeight: "300",
    color: "#505050",
  },
  location: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    color: "gray",
  },
  actions: {
    paddingHorizontal: 10,
    alignItems: "center",
  },
  callButton: {
    backgroundColor: "#673de72a",
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 50,
  },
  whatsappButton: {
    marginTop: 10,
    backgroundColor: "#dcf8c6",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 50,
  },
});

export default Card;
