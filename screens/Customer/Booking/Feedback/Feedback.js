import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import colors from "../../../../constants/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuthStore } from "../../../../zustand/authStore";
import axios from "axios";
import { hostUrl } from "../../../../services";
import EvilIcons from "@expo/vector-icons/EvilIcons";

const Feedback = ({
  isVisible,
  setIsVisible,
  email,
  serviceType,
  bookingId,
  setReload,
}) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [selectedEmojiIndex, setSelectedEmojiIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const { name } = useAuthStore();

  const feedbackEmoji = [
    {
      name: "star-outline",
      solidName: "star",
      value: 1,
    },
    {
      name: "star-outline",
      solidName: "star",
      value: 2,
    },
    {
      name: "star-outline",
      solidName: "star",
      value: 3,
    },
    {
      name: "star-outline",
      solidName: "star",
      value: 4,
    },
    {
      name: "star-outline",
      solidName: "star",
      value: 5,
    },
  ];

  const handleRating = (index) => {
    setSelectedEmojiIndex(index);
    setRating(index + 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const feedbackData = {
      emailId: email,
      feedback: feedback,
      rating: rating,
      serviceType: serviceType,
      userName: name,
    };

    try {
      const response = await axios.post(
        `${hostUrl}/mazdoor/v1/addSPFeedback/${bookingId}`,
        feedbackData
      );
      setReload(true);
      setSuccessMessage("Feedback submitted successfully!");
      setLoading(false);
      setIsVisible(false);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setLoading(false);
    }
  };

  return (
    <>
      <Modal visible={isVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalOverlay}
            onPress={() => setIsVisible(false)}
          />
          <View style={styles.modalContent}>
            <View>
              <View style={styles.header}>
                <Text style={styles.headerText}>Feedback</Text>
                <TouchableOpacity
                  onPress={() => setIsVisible(false)}
                  style={styles.closeButton}
                >
                  <Entypo name="cross" size={20} color={colors.danger} />
                </TouchableOpacity>
              </View>
              <View style={styles.emojiContainer}>
                {feedbackEmoji.map((emoji, index) => (
                  <TouchableOpacity
                    onPress={() => handleRating(index)}
                    key={emoji.value}
                  >
                    <MaterialCommunityIcons
                      name={
                        index <= selectedEmojiIndex
                          ? emoji.solidName
                          : emoji.name
                      }
                      size={34}
                      color="green"
                    />
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Please fill your feedback..."
                  multiline
                  value={feedback}
                  onChangeText={setFeedback}
                  style={styles.textInput}
                />
              </View>
              <View style={styles.submitContainer}>
                {loading ? (
                  <ActivityIndicator size="large" color={colors.primary} />
                ) : (
                  <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.submitButtonText}>Submit</Text>
                  </TouchableOpacity>
                )}
                {successMessage ? (
                  <Text style={styles.successMessage}>{successMessage}</Text>
                ) : null}
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
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
    height: height * 0.5,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    overflow: "hidden",
    borderTopWidth: 0.5,
    borderTopColor: "lightgray",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 20,
    color: "#505050",
  },
  closeButton: {
    backgroundColor: colors.dangerBackground,
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 50,
  },
  emojiContainer: {
    marginHorizontal: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
    marginTop: 40,
  },
  inputContainer: {
    borderWidth: 0.7,
    borderColor: "lightgray",
    marginBottom: 20,
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: "white",
    marginVertical: 20,
    marginHorizontal: 10,
  },
  textInput: {
    borderWidth: 0,
    borderRadius: 10,
    padding: 10,
    height: 100,
    textAlignVertical: "top",
    fontSize: 14,
    color: "#505050",
  },
  submitContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  submitButton: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: "90%",
    borderRadius: 10,
    elevation: 5,
    marginBottom: 100,
  },
  submitButtonText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
  },
  successMessage: {
    marginTop: 10,
    color: colors.success,
    fontSize: 16,
  },
});

export default Feedback;
