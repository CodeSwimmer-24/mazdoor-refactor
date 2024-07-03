import {
  View,
  Text,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../../../../constants/colors";
import CustomTextInput from "../../../../components/TextInput";
import DropdownTextInput from "../../../../components/DropdownTextInput";
import axios from "axios";
import { hostUrl } from "../../../../services";
import { useAuthStore } from "../../../../zustand/authStore";

const EditProfile = ({
  editAccountModalVisible,
  setEditAccountModalVisible,
  buildingAddress,
  locality,
  name,
  email,
  contact,
}) => {
  const [formData, setFormData] = useState({
    buildingAddress,
    locality,
    name,
    email,
    contact,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const { setEmail, setName, setContact, setBuildingAddress, setLocality } =
    useAuthStore();

  const handleSubmit = async () => {
    const payload = {
      address: {
        area: "",
        buildingAddress: formData.buildingAddress,
        city: "",
        exactLocation: "",
        locality: formData.locality,
        region: "",
      },
      contactNo: formData.contact,
      emailId: email,
      name: formData.name,
      role: "customer",
    };

    setLoading(true);

    try {
      const response = await axios.put(
        `${hostUrl}/mazdoor/v1/updateProfile`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        Alert.alert("Success", "Profile updated successfully");

        // Update Zustand state
        setEmail(formData.email);
        setName(formData.name);
        setContact(formData.contact);
        setBuildingAddress(formData.buildingAddress);
        setLocality(formData.locality);

        setEditAccountModalVisible(false);
      } else {
        Alert.alert("Error", "Failed to update profile");
      }
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 200 range
        console.error("Error response:", error.response);
        Alert.alert(
          "Error",
          `Failed to update profile: ${
            error.response.data.message || error.response.status
          }`
        );
      } else if (error.request) {
        // Request was made but no response received
        console.error("Error request:", error.request);
        Alert.alert(
          "Error",
          "No response from server. Please try again later."
        );
      } else {
        // Something else caused an error
        console.error("Error message:", error.message);
        Alert.alert("Error", `An error occurred: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={editAccountModalVisible}
      transparent={true}
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setEditAccountModalVisible(false)}
        />
        <View style={styles.modalContent}>
          <View>
            <View style={styles.crossContainer}>
              <TouchableOpacity
                onPress={() => {
                  setEditAccountModalVisible(false);
                }}
                style={styles.cross}
              >
                <Entypo name="cross" size={22} color="#f44336" />
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView>
            <View style={styles.scrollContent}>
              <View style={styles.profileSection}>
                <Image
                  source={{
                    uri: "https://pixelmator.com/community/download/file.php?avatar=20501_1694070821.jpg",
                  }}
                  style={styles.profileImage}
                />
              </View>
            </View>
            <View style={{ alignItems: "center" }}>
              <View style={{ width: "95%" }}>
                <CustomTextInput
                  iconName="person-outline"
                  iconType="Ionicons"
                  placeholder="Edit Name"
                  value={formData.name}
                  onChangeText={(text) => handleChange("name", text)}
                />
                <CustomTextInput
                  iconName="call-outline"
                  iconType="Ionicons"
                  placeholder="Edit Contact No."
                  value={formData.contact}
                  onChangeText={(text) => handleChange("contact", text)}
                />
                <CustomTextInput
                  iconName="location-outline"
                  iconType="Ionicons"
                  placeholder="Building Address"
                  value={formData.buildingAddress}
                  onChangeText={(text) => handleChange("buildingAddress", text)}
                />
                <DropdownTextInput
                  iconName="map"
                  iconType="Ionicons"
                  placeholder="Locality"
                  value={formData.locality}
                  onChangeText={(text) => handleChange("locality", text)}
                />
              </View>
            </View>
          </ScrollView>
          <View style={styles.closeButtonContainer}>
            <TouchableOpacity
              onPress={handleSubmit}
              style={styles.closeButton}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Text style={styles.closeButtonText}>SUBMIT</Text>
              )}
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
    height: height * 0.7,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    overflow: "hidden",
    borderTopWidth: 0.5,
    borderTopColor: "lightgray",
  },
  crossContainer: {
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  cross: {
    backgroundColor: "#f443361a",
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 50,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  profileSection: {
    alignItems: "center",
    marginTop: 20,
  },
  profileImage: {
    height: 80,
    width: 80,
    borderRadius: 50,
  },
  profileName: {
    marginTop: 10,
    fontSize: 20,
    color: "#505050",
  },
  profileEmail: {
    fontSize: 12,
    color: "gray",
    fontWeight: "300",
  },
  detailsSection: {
    marginTop: 30,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  detailText: {
    paddingLeft: 5,
    fontSize: 14,
    color: "#505050",
  },
  closeButtonContainer: {
    alignItems: "center",
    padding: 10,
  },
  closeButton: {
    backgroundColor: colors.primary,
    width: "95%",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 10,
    elevation: 5,
  },
  closeButtonText: {
    fontSize: 16,
    color: "white",
  },
});

export default EditProfile;
