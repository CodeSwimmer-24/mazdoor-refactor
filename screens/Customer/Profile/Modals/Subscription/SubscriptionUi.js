import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import colors from "../../../../../constants/colors";
import useProfileImage from "../../../../../constants/profileImage";

const SubscriptionUi = ({
  name,
  selectedPlan,
  handlePlanSelect,
  benefits,
  subscriptions,
  setSubscriptionModalVisible,
}) => {
  const profileImageUri = useProfileImage();
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
            uri: profileImageUri,
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
          {Array.isArray(subscriptions) && subscriptions.length > 0 ? (
            subscriptions.map((subscription) => (
              <TouchableOpacity
                key={subscription.subscriptionId}
                style={[
                  styles.planCard,
                  selectedPlan === subscription.subscriptionDuration
                    ? styles.selectedCard
                    : styles.nonSelectedCard,
                ]}
                onPress={() =>
                  handlePlanSelect(subscription.subscriptionDuration)
                }
              >
                <View style={styles.cardInnerContainer}>
                  <View>
                    <Text style={styles.cardTitle}>
                      {subscription.subscriptionDuration}
                    </Text>
                    <Text style={styles.cardPrice}>
                      ₹ {subscription.price}{" "}
                      <Text style={styles.cardPriceFrequency}>
                        /{subscription.subscriptionDuration}
                      </Text>
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.radioButton,
                      selectedPlan === subscription.subscriptionDuration
                        ? styles.radioButtonSelectedBorder
                        : styles.radioButtonUnselectedBorder,
                    ]}
                  >
                    {selectedPlan === subscription.subscriptionDuration && (
                      <View style={styles.radioButtonSelected} />
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text>Loading subscriptions...</Text>
          )}
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
    paddingBottom: 5,
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
