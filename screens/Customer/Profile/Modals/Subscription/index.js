import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  BackHandler,
  Alert,
  Linking,
} from "react-native";
import axios from "axios";
import { hostUrl } from "../../../../../services";
import { useAuthStore } from "../../../../../zustand/authStore";
import SubscriptionUi from "./SubscriptionUi";
import colors from "../../../../../constants/colors";

const benefits = [
  "Access to all service providers",
  "Book unlimited services of your choice",
];

const Subscription = ({
  subscriptionModalVisible,
  setSubscriptionModalVisible,
  name,
}) => {
  const [selectedPlan, setSelectedPlan] = useState("Monthly");
  const [subscriptions, setSubscriptions] = useState([]);
  const [reload, setReload] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { email, contact, role } = useAuthStore();

  useEffect(() => {
    const fetchUserSubscription = async () => {
      try {
        const response = await axios.get(
          `${hostUrl}/mazdoor/v1/getUserSubscription?emailId=${email}`
        );
        setIsSubscribed(response.data);
      } catch (error) {
        console.error("Error fetching user subscription:", error);
      }
    };

    fetchUserSubscription();
  }, [email, reload]);

  useEffect(() => {
    const fetchAllSubscriptions = async () => {
      try {
        const response = await axios.get(
          `${hostUrl}/mazdoor/v1/getAllSubscription/${
            role === "customer" ? true : false
          }`
        );
        const subscriptionData = response.data.map((item) => ({
          subscriptionId: item.subscriptionId,
          subscriptionDuration: item.subscriptionDuration,
          price: item.price,
          subscriptionDesc: item.subscriptionDesc,
        }));
        setSubscriptions(subscriptionData);
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
      }
    };

    fetchAllSubscriptions();
  }, [role]);

  useEffect(() => {
    const backAction = () => {
      if (subscriptionModalVisible) {
        setSubscriptionModalVisible(false);
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [subscriptionModalVisible]);

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  const handlePayment = async () => {
    const selectedSubscription = subscriptions.find(
      (subscription) => subscription.subscriptionDuration === selectedPlan
    );

    if (!selectedSubscription) {
      Alert.alert("Error", "Selected plan not found");
      return;
    }

    // Construct the UPI link
    const upiId = "digitracktui.rzp@mairtel"; // Replace with actual UPI ID
    const upiUrl = `upi://pay?pa=${upiId}&pn=DigiMazdoor&am=${selectedSubscription.price}&cu=INR&tn=Subscription payment`;

    // Open UPI payment link
    try {
      await Linking.openURL(upiUrl);
      Alert.alert(
        "Payment Initiated",
        "Please complete the payment in the UPI app."
      );

      // Confirm the payment success
      // (You might want to add further validation here based on your requirements)
      const payload = {
        emailId: email,
        selectedSubscriptionId: selectedSubscription.subscriptionId,
        subscriptionDesc: selectedSubscription.subscriptionDesc,
        subscriptionDuration: selectedSubscription.subscriptionDuration,
        subscriptionStatus: true,
      };

      try {
        const response = await axios.post(
          `${hostUrl}/mazdoor/v1/addUserSubscription`,
          payload
        );
        if (response.status === 200) {
          Alert.alert("Payment Successful", "Thanks for subscribing");
          setIsSubscribed(true);
          setReload(true);
        }
      } catch (error) {
        console.error("Error adding subscription:", error);
        Alert.alert("Error", "Subscription failed, please try again.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to initiate UPI payment.");
    }
  };
  return (
    <Modal
      visible={subscriptionModalVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setSubscriptionModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setSubscriptionModalVisible(false)}
        />
        <View style={styles.modalContent}>
          <ScrollView>
            <SubscriptionUi
              name={name}
              selectedPlan={selectedPlan}
              handlePlanSelect={handlePlanSelect}
              benefits={benefits}
              subscriptions={subscriptions}
              setSubscriptionModalVisible={setSubscriptionModalVisible}
            />
          </ScrollView>
          <View style={styles.closeButtonContainer}>
            {isSubscribed?.isSubscribed ? (
              <View style={styles.alreadySubs}>
                <Text style={styles.closeButtonText}>
                  Your {isSubscribed?.subscriptionDuration} plan will expire on{" "}
                  {isSubscribed.subscriptionExpiryDate} 🎉
                </Text>
              </View>
            ) : (
              <TouchableOpacity
                onPress={handlePayment}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>Go to payment</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    height: height * 0.7,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // padding: 10,
    overflow: "hidden",
    borderTopWidth: 0.5,
    borderTopColor: "lightgray",
    // paddingBottom: 60, // Add padding to prevent overlap with button
  },
  closeButtonContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "white",
  },
  closeButton: {
    backgroundColor: colors.baseColor,
    width: "100%",
    alignItems: "center",
    paddingVertical: 15,
    borderRadius: 10,
    elevation: 5,
  },
  closeButtonText: {
    fontSize: 14,
    color: "white",
  },
  alreadySubs: {
    backgroundColor: "#4caf50",
    width: "100%",
    alignItems: "center",
    paddingVertical: 15,
    // borderRadius: 10,
    elevation: 5,
  },
});

export default Subscription;
