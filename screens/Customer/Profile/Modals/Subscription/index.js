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
} from "react-native";
import axios from "axios";
import { hostUrl } from "../../../../../services";
import { useAuthStore } from "../../../../../zustand/authStore";
import SubscriptionUi from "./SubscriptionUi";
import colors from "../../../../../constants/colors";
import RazorpayCheckout from "react-native-razorpay";
import { rzp_logo } from "../../../../../constants/UpiPayments";
import { RAZORPAY_KEY } from "@env"; // Import Razorpay key from .env

const benefits = [
  "Access to all service providers",
  "Book unlimited services of your choice",
  "Large collection of service providers",
  "Find service near your location",
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
          `${hostUrl}/mazdoor/v1/getAllSubscription/${role === "customer" ? true : false}`
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

  const handlePayment = () => {
    const selectedSubscription = subscriptions.find(
      (subscription) => subscription.subscriptionDuration === selectedPlan
    );

    if (!selectedSubscription) {
      Alert.alert("Error", "Selected plan not found");
      return;
    }

    const amountInPaise = selectedSubscription.price * 100;

    const options = {
      description: "Subscription payment",
      image: rzp_logo,
      currency: "INR",
      key: RAZORPAY_KEY, // Use the key from the .env file
      amount: amountInPaise,
      name: "DigiMazdoor",
      prefill: {
        email: email,
        contact: contact,
        name: name,
      },
      theme: { color: colors.primary },
      method: "upi",
      upi: {
        vpa: "success@razorpay",
      },
    };

    RazorpayCheckout.open(options)
      .then(async (data) => {
        Alert.alert("Payment Successful", "Thanks for subscribing");

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
            setIsSubscribed(true);
            setReload(true);
          }
        } catch (error) {
          console.error("Subscription Fail, Please try again", error);
        }
      })
      .catch((error) => {
        Alert.alert("Fail to subscribe, Please try again");
      });
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
              <TouchableOpacity onPress={handlePayment} style={styles.closeButton}>
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
    height: height * 1,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
    overflow: "hidden",
    borderTopWidth: 0.5,
    borderTopColor: "lightgray",
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
    fontSize: 14,
    color: "white",
  },
  alreadySubs: {
    backgroundColor: "#4caf50",
    width: "95%",
    alignItems: "center",
    paddingVertical: 15,
    borderRadius: 10,
    elevation: 5,
  },
});

export default Subscription;
