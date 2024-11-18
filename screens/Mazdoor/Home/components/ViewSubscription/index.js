import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import axios from "axios"; // Added Axios import
import colors from "../../../../../constants/colors";
import { hostUrl } from "../../../../../services";
import { useAuthStore } from "../../../../../zustand/authStore";
import Subscription from "../../../../Customer/Profile/Modals/Subscription";

const ViewSubscription = () => {
  const [subscriptionData, setSubscriptionData] = useState(null); // Changed state name for clarity
  const [loading, setLoading] = useState(true); // Optional: Loading state
  const [reload, setReload] = useState(false); // State to trigger reload after subscription purchase

  const { email, name, role } = useAuthStore();
  const [subscriptionModalVisible, setSubscriptionModalVisible] =
    useState(false);

  useEffect(() => {
    const fetchUserSubscription = async () => {
      try {
        const response = await axios.get(
          `${hostUrl}/mazdoor/v1/getUserSubscription?role=${role}&spEmailId=${email}`
        );
        setSubscriptionData(response.data);
      } catch (error) {
        console.error("Error fetching user subscription:", error);
        Alert.alert("Error", "Unable to fetch subscription data.");
      } finally {
        setLoading(false); // Stop loading regardless of success or failure
      }
    };

    if (email) {
      fetchUserSubscription();
    }
  }, [email, reload]); // Now listens to the `reload` state, re-fetches data when reload changes

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Subscription Status</Text>
      <Text style={styles.statusText}>
        {subscriptionData?.isSubscribed ? (
          <Text style={styles.subscriptionText}>
            आपकी {subscriptionData.subscriptionDuration} योजना की समाप्ति तिथि{" "}
            {subscriptionData.subscriptionExpiryDate} है 🎉
          </Text>
        ) : (
          <Text style={styles.subscriptionText}>
            आपके पास कोई सब्सक्रिप्शन प्लान नहीं है। कृपया एक प्लान खरीदें।
          </Text>
        )}
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            setSubscriptionModalVisible(true);
          }}
          style={[
            styles.button,
            subscriptionData?.isSubscribed
              ? styles.subscribedButton
              : styles.unsubscribedButton,
          ]}
        >
          <Text
            style={[
              styles.buttonText,
              subscriptionData?.isSubscribed
                ? styles.subscribedButtonText
                : styles.unsubscribedButtonText,
            ]}
          >
            {subscriptionData?.isSubscribed
              ? "You are a Subscriber 🎉🎉"
              : "Purchase Subscription"}
          </Text>
        </TouchableOpacity>
      </View>
      {subscriptionModalVisible && (
        <Subscription
          subscriptionModalVisible={subscriptionModalVisible}
          setSubscriptionModalVisible={setSubscriptionModalVisible}
          name={name}
          setReload={setReload} // Pass setReload to trigger a reload after successful subscription
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
  },
  container: {
    marginVertical: 20,
    marginHorizontal: 25,
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 5,
    elevation: 5,
    backgroundColor: colors.white,
  },
  title: {
    color: colors.primary,
    fontWeight: "600",
    fontSize: 18,
    marginBottom: 10,
  },
  statusText: {
    fontSize: 16,
    marginBottom: 20,
    color: "#505050",
  },
  subscriptionText: {
    fontSize: 14,
  },
  buttonContainer: {
    alignItems: "flex-start",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontWeight: "400",
    fontSize: 14,
  },
  // Subscribed button styles
  subscribedButton: {
    backgroundColor: `${colors.success}1a`,
  },
  subscribedButtonText: {
    color: colors.success,
    fontWeight: "500",
  },
  // Unsubscribed button styles
  unsubscribedButton: {
    backgroundColor: colors.dangerBackground,
  },
  unsubscribedButtonText: {
    color: colors.danger,
    fontWeight: "500",
  },
});

export default ViewSubscription;
