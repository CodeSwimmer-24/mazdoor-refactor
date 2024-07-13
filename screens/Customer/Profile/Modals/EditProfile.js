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
import { Entypo } from "@expo/vector-icons";
import colors from "../../../../constants/colors";
import CustomTextInput from "../../../../components/TextInput";
import DropdownTextInput from "../../../../components/DropdownTextInput";
import axios from "axios";
import { hostUrl } from "../../../../services";
import { useAuthStore } from "../../../../zustand/authStore";
import { useSystemStore } from "../../../../zustand/systemStore";
import useProfileImage from "../../../../constants/profileImage";

const EditProfile = ({
  editAccountModalVisible,
  setEditAccountModalVisible,
  buildingAddress,
  locality,
  exactLocation,
  name,
  email,
  contact,
  age,
  aadharNo,
  role,
}) => {
  const [formData, setFormData] = useState({
    buildingAddress,
    locality,
    exactLocation,
    name,
    email,
    contact,
    age,
    aadharNo,
  });

  const { height } = Dimensions.get("window");
  const modalHeight = role === "mazdoor" ? height * 0.85 : height * 0.55;

  const [loading, setLoading] = useState(false);
  const profileImageUri = useProfileImage();

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const {
    setEmail,
    setName,
    setAge,
    setAadharNo,
    setContact,
    setBuildingAddress,
    setLocality,
    setExactLocation,
  } = useAuthStore();
  const { locations } = useSystemStore();

  const handleSubmit = async () => {
    if (
      (role === "mazdoor" && formData.aadharNo.length !== 12) ||
      formData.age.length !== 2
    ) {
      Alert.alert(
        "Error",
        "Aadhar number must be 12 digits and age must be 2 digits"
      );
      return;
    }

    const payload = {
      address: {
        buildingAddress: formData.buildingAddress,
        exactLocation: formData.exactLocation,
        locality: formData.locality,
      },
      contactNo: formData.contact,
      emailId: email,
      name: formData.name,
      aadharNo: formData.aadharNo,
      age: formData.age,
      role: role,
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
        setEmail(formData.email);
        setName(formData.name);
        setContact(formData.contact);
        setBuildingAddress(formData.buildingAddress);
        setLocality(formData.locality);
        setExactLocation(formData.exactLocation);
        setAadharNo(formData.aadharNo);
        setAge(formData.age);
        setEditAccountModalVisible(false);
        Alert.alert("Success", "Profile updated successfully");
      } else {
        Alert.alert("Error", "Failed to update profile");
      }
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.message);
        Alert.alert(
          "Error",
          `Failed to update profile: ${
            error.response.data.message || error.response.status
          }`
        );
      } else if (error.request) {
        console.error("Error request:", error.request);
        Alert.alert(
          "Error",
          "No response from server. Please try again later."
        );
      } else {
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
        <ScrollView style={[styles.modalContent, { height: modalHeight }]}>
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
                    uri: profileImageUri,
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
                {role === "mazdoor" && (
                  <>
                    <CustomTextInput
                      iconName="document-outline"
                      iconType="Ionicons"
                      placeholder="Edit Aadhar No."
                      value={formData.aadharNo}
                      onChangeText={(text) => handleChange("aadharNo", text)}
                    />
                    <CustomTextInput
                      iconName="people-outline"
                      iconType="Ionicons"
                      placeholder="Edit Age"
                      value={formData.age}
                      onChangeText={(text) => handleChange("age", text)}
                    />
                  </>
                )}
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
                  list={Object.keys(locations)}
                  placeholder="Locality"
                  value={formData.locality}
                  onChangeText={(text) => handleChange("locality", text)}
                />

                <DropdownTextInput
                  iconName="map"
                  iconType="Ionicons"
                  list={locations[formData.locality]}
                  placeholder="Exact Location"
                  value={formData.exactLocation}
                  onChangeText={(text) => handleChange("exactLocation", text)}
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
        </ScrollView>
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
    marginBottom: 20,
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
