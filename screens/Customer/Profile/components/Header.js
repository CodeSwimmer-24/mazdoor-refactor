import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from "react-native";
import axios from "axios";
import colors from "../../../../constants/colors";
import useProfileImage from "../../../../constants/profileImage";
import { hostUrl } from "../../../../services";
import { useFocusEffect } from "@react-navigation/native";
import { useAuthStore } from "../../../../zustand/authStore";

const Header = ({ name, email }) => {
  const profileImageUri = useProfileImage();
  const [subscriptionData, setSubscriptionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State for capturing error messages
  const { role } = useAuthStore();

  const fetchUserSubscription = async () => {
    setLoading(true);
    setError(null); // Reset error state before fetching data
    try {
      // Determine the appropriate parameter based on the role
      const emailParam = role === "customer" ? "userEmailId" : "spEmailId";
      const response = await axios.get(
        `${hostUrl}/mazdoor/v1/getUserSubscription?role=${role}&${emailParam}=${email}`
      );
      setSubscriptionData(response.data);
    } catch (error) {
      console.error("Error fetching user subscription:", error);
      // Display more details about the error, including server response data if available
      setError(
        error.response
          ? `${error.response.status} - ${error.response.data?.error || "Server Error"
          }`
          : "Network Error"
      );
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUserSubscription();
    }, [email])
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#B6D0E25a" />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Profile Header */}
        <View style={styles.headerContainer} />

        {/* Profile Info */}
        <View style={styles.profileInfoContainer}>
          <Image source={profileImageUri} style={styles.profileImage} />
          <Text style={styles.profileName}>{name}</Text>

          {role === "customer" ? (
            <Text>FREE</Text>
          ) : (
            // Display Subscription Information
            <View>
              {loading && (
                <Text style={styles.subscribedText}>Loading subscription status...</Text>
              )}
              {error && (
                <Text style={styles.errorText}>{`Error: ${error}`}</Text>
              )}
              {!loading && !error && subscriptionData ? (
                <>
                  <Text style={styles.subscribedText}>
                    Subscribed Validity:{" "}
                    <Text style={{ fontWeight: "600" }}>
                      {subscriptionData.subscriptionExpiryDate}
                    </Text>
                  </Text>
                  <Text style={styles.subscriptionStatus}>
                    {subscriptionData.subscriptionExpiryDate
                      ? "Subscribed"
                      : "Please Subscribe"}
                  </Text>
                </>
              ) : null}
              {!loading && !error && !subscriptionData && (
                <Text style={styles.subscribedText}>
                  No subscription data available
                </Text>
              )}
            </View>
          )}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContainer: {
    paddingBottom: 40,
  },
  headerContainer: {
    backgroundColor: "#B6D0E26a",
    paddingVertical: 10,
    height: 140,
    justifyContent: "center",
    alignItems: "center",
  },
  profileInfoContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    height: 80,
    width: 80,
    borderRadius: 50,
    marginTop: -50,
    padding: 10,
  },
  profileName: {
    paddingTop: 0,
    fontSize: 22,
    fontWeight: "400",
    color: colors.gray,
  },
  subscribedText: {
    paddingTop: 4,
    fontSize: 13,
    fontWeight: "400",
    color: "#A0A0A0",
  },
  subscriptionStatus: {
    fontWeight: "600",
    color: colors.gray,
    fontSize: 14,
    textAlign: "center"
  },
  errorText: {
    color: "red",
    fontSize: 14,
    paddingTop: 4,
  },
});

export default Header;
