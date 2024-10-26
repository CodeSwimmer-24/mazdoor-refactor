import React, { useEffect, useState } from "react";
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

const Header = ({ name, email }) => {
  const profileImageUri = useProfileImage();
  const [subscriptionData, setSubscriptionData] = useState(null); // Store subscription data
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchUserSubscription = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const response = await axios.get(
          `${hostUrl}/mazdoor/v1/getUserSubscription?emailId=${email}`
        );
        setSubscriptionData(response.data); // Store the subscription data
      } catch (error) {
        console.error("Error fetching user subscription:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchUserSubscription();
  }, [email]);

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

          {/* Display Subscription Information */}
          {loading ? (
            <Text style={styles.subscribedText}>
              Loading subscription status...
            </Text>
          ) : subscriptionData ? (
            <>
              <Text style={styles.subscribedText}>
                Subscribed Validity
                <Text
                  style={{
                    fontWeight: "600",
                  }}
                >
                  {" "}
                  {subscriptionData.subscriptionExpiryDate}{" "}
                </Text>
              </Text>
              <Text style={styles.subscriptionStatus}>
                {subscriptionData.subscriptionExpiryDate
                  ? "Subscribed"
                  : "Please Subscribe"}
              </Text>
            </>
          ) : (
            <Text style={styles.subscribedText}>
              No subscription data available
            </Text>
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
  },
});

export default Header;
