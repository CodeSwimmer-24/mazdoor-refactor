import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import colors from "../../../../../constants/colors";

const SubscriptionUi = ({
  name,
  selectedPlan,
  handlePlanSelect,
  benefits,
  setSubscriptionModalVisible,
}) => {
  return (
    <>
      <TouchableOpacity
        onPress={() => setSubscriptionModalVisible(false)}
        style={styles.iconContainer}
      >
        <AntDesign name="left" size={22} color="black" />
      </TouchableOpacity>
      <View style={styles.profileContainer}>
        <Image
          source={{
            uri: "https://pixelmator.com/community/download/file.php?avatar=20501_1694070821.jpg",
          }}
          style={styles.profileImage}
        />
        <View style={styles.profileTextContainer}>
          <Text style={styles.profileName}>{name}</Text>
          <Text style={styles.subscriptionType}>Full access Subscription</Text>
        </View>
      </View>
      <View style={styles.planContainer}>
        <Text style={styles.planTitle}>Choose a plan</Text>
        <Text style={styles.planSubtitle}>
          Monthly or yearly? It's your call
        </Text>
        <View style={styles.cardsContainer}>
          <TouchableOpacity
            style={[
              styles.planCard,
              selectedPlan === "monthly"
                ? styles.selectedCard
                : styles.nonSelectedCard,
            ]}
            onPress={() => handlePlanSelect("monthly")}
          >
            <View style={styles.cardInnerContainer}>
              <View>
                <Text style={styles.cardTitle}>Monthly</Text>
                <Text style={styles.cardPrice}>
                  ₹ 29.00 <Text style={styles.cardPriceFrequency}>/month</Text>
                </Text>
              </View>
              <View
                style={[
                  styles.radioButton,
                  selectedPlan === "monthly"
                    ? styles.radioButtonSelectedBorder
                    : styles.radioButtonUnselectedBorder,
                ]}
              >
                {selectedPlan === "monthly" && (
                  <View style={styles.radioButtonSelected} />
                )}
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.planCard,
              selectedPlan === "yearly"
                ? styles.selectedCard
                : styles.nonSelectedCard,
            ]}
            onPress={() => handlePlanSelect("yearly")}
          >
            <View style={styles.cardInnerContainer}>
              <View>
                <View style={styles.yearlyHeader}>
                  <Text style={styles.cardTitle}>Yearly</Text>
                  <View style={styles.saveBadge}>
                    <Text style={styles.saveBadgeText}>Save 10%</Text>
                  </View>
                </View>
                <Text style={styles.cardPrice}>
                  ₹ 299.00{" "}
                  <Text style={styles.cardPriceFrequency}>/yearly</Text>
                </Text>
              </View>
              <View
                style={[
                  styles.radioButton,
                  selectedPlan === "yearly"
                    ? styles.radioButtonSelectedBorder
                    : styles.radioButtonUnselectedBorder,
                ]}
              >
                {selectedPlan === "yearly" && (
                  <View style={styles.radioButtonSelected} />
                )}
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 20 }}>
          {benefits.map((benefit, index) => (
            <View key={index} style={styles.benefitContainer}>
              <AntDesign name="checkcircle" size={18} color={colors.primary} />
              <View style={styles.benefitTextContainer}>
                <Text style={styles.benefitText}>{benefit}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingHorizontal: 10,
  },
  profileContainer: {
    flexDirection: "row",
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  profileImage: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  profileTextContainer: {
    marginLeft: 15,
  },
  profileName: {
    fontSize: 16,
    color: "#505050",
    fontWeight: "500",
  },
  subscriptionType: {
    fontSize: 14,
    color: "gray",
    fontWeight: "300",
  },
  planContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  planTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#505050",
  },
  planSubtitle: {
    fontSize: 14,
    fontWeight: "300",
    color: "gray",
  },
  cardsContainer: {
    width: "100%",
    justifyContent: "space-around",
    marginTop: 20,
  },
  planCard: {
    width: "100%",
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  selectedCard: {
    borderWidth: 2.5,
    borderColor: colors.primary,
  },
  nonSelectedCard: {
    borderWidth: 1,
    borderColor: "lightgray",
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  radioButtonSelectedBorder: {
    borderWidth: 10,
    borderColor: colors.primary,
  },
  radioButtonUnselectedBorder: {
    borderWidth: 1,
    borderColor: "lightgray",
  },
  radioButtonSelected: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: colors.white,
  },
  cardInnerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardTitle: {
    fontSize: 20,
    color: "#505050",
  },
  cardPrice: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "600",
    color: colors.baseColor,
  },
  cardPriceFrequency: {
    marginLeft: 3,
    fontSize: 14,
    fontWeight: "600",
  },
  yearlyHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  saveBadge: {
    marginLeft: 10,
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 50,
  },
  saveBadgeText: {
    fontSize: 10,
    color: colors.white,
    fontWeight: "600",
  },
  benefitContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  benefitTextContainer: {
    marginLeft: 20,
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderBottomColor: "lightgray",
    width: "85%",
  },
  benefitText: {
    color: "#505050",
    fontSize: 14,
  },
  closeButtonContainer: {
    alignItems: "center",
    padding: 10,
  },
  closeButton: {
    backgroundColor: colors.baseColor,
    width: "95%",
    alignItems: "center",
    paddingVertical: 15,
    borderRadius: 10,
    elevation: 5,
  },
  closeButtonText: {
    fontSize: 16,
    color: "white",
  },
});

export default SubscriptionUi;