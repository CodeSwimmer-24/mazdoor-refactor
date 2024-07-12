import {
  View,
  Text,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import SubscriptionUi from "./SubscriptionUi";
import colors from "../../../../../constants/colors";
import axios from "axios";
import { hostUrl } from "../../../../../services";

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

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await axios.get(
          `${hostUrl}/mazdoor/v1/getAllSubscription/true`
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

    fetchSubscriptions();
  }, []);

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  return (
    <Modal
      visible={subscriptionModalVisible}
      transparent={true}
      animationType="slide"
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
            <TouchableOpacity style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Go to payment</Text>
            </TouchableOpacity>
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
    padding: 20,
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
});

export default Subscription;
