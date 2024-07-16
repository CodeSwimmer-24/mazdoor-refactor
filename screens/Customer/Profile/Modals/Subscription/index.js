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
import Upi from "../Upi";
import SubscriptionUi from "./SubscriptionUi";
import colors from "../../../../../constants/colors";
import {
  Phone_PAY_UPI_URL,
  UPI_URL_GPAY,
} from "../../../../../constants/UpiPayments";

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
  role,
}) => {
  const [selectedPlan, setSelectedPlan] = useState("Monthly");
  const [subscriptions, setSubscriptions] = useState([]);
  const [upiPopup, setUpiPopup] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { email } = useAuthStore();

  useEffect(() => {
    const fetchUserSubscription = async () => {
      try {
        const response = await axios.get(
          `${hostUrl}/mazdoor/v1/getUserSubscription?emailId=${email}`
        );
        setIsSubscribed(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching user subscription:", error);
      }
    };

    fetchUserSubscription();
  }, [email]);

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

  const payWithGooglePay = () => {
    Linking.openURL(UPI_URL_GPAY)
      .then((data) => {
        console.log("Google Pay opened successfully:", data);

        const transactionStatus = data && data.url === "success";
        if (transactionStatus) {
          Alert.alert("Success", "Transaction successful!");
        } else {
          Alert.alert("Error", "Transaction failed. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Failed to open Google Pay:", error);
        Alert.alert(
          "Error",
          "Failed to open Google Pay. Please make sure you have Google Pay installed."
        );
      });
  };

  const payWithPhonePe = () => {
    Linking.openURL(Phone_PAY_UPI_URL)
      .then((data) => {
        console.log("PhonePe opened successfully:", data);

        console.log("PhonePe response data:", data);
      })
      .catch((error) => {
        console.error("Failed to open PhonePe:", error);

        console.error("PhonePe error response:", error);

        Alert.alert(
          "Error",
          "Failed to open PhonePe. Please make sure you have PhonePe installed."
        );
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
            {isSubscribed ? (
              <View style={styles.alreadySubs}>
                <Text style={styles.closeButtonText}>
                  You are a Subscriber 🎉
                </Text>
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => setUpiPopup(true)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>Go to payment</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
      <Upi
        upiPopup={upiPopup}
        setUpiPopup={setUpiPopup}
        payWithGooglePay={payWithGooglePay}
        payWithPhonePe={payWithPhonePe}
      />
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
    fontSize: 16,
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
