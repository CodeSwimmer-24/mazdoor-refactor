import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Ionicons from "@expo/vector-icons/Ionicons";
import colors from "../../../../constants/colors";
import { useAuthStore } from "../../../../zustand/authStore";

const Feedback = () => {
  const [feedback, setFeedback] = useState([]);
  const [error, setError] = useState(null); // State to track errors
  const { email } = useAuthStore()

  const fetchFeedback = async () => {
    try {
      const response = await axios.get(
        `https://digimazdoor.tech/mazdoor/v1/getFeedback/${email}`
      );
      if (response.data && Array.isArray(response.data)) {
        setFeedback(response.data);
      } else {
        console.error("Unexpected response structure:", response.data);
        setFeedback([]);
      }
    } catch (error) {
      console.error("Error fetching feedback:", error);
      setError("Failed to fetch feedback data.");
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  return (
    <View style={styles.container}>
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : feedback.length === 0 ? (
        <Text style={styles.noFeedbackText}>No feedback available</Text>
      ) : (
        feedback.map((feed, index) => (
          <View key={index} style={styles.feedbackContainer}>
            <View style={styles.feedbackTextContainer}>
              <Text style={styles.feedbackText}>
                {feed.feedback ? feed.feedback : "No feedback"}
              </Text>
            </View>
            <View>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={18} color="white" />
                <Text style={styles.ratingText}>{feed.rating}</Text>
              </View>
            </View>
          </View>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginVertical: 10,
  },
  noFeedbackText: {
    color: "#505050",
    textAlign: "center",
    marginVertical: 10,
  },
  feedbackContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: 10,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    paddingBottom: 15,
  },
  feedbackTextContainer: {
    width: "70%",
  },
  feedbackText: {
    fontSize: 16,
    color: "#505050",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 50,
  },
  ratingText: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: "600",
    color: colors.white,
  },
});

export default Feedback;
