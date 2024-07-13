import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  Modal,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
} from "react-native";
import CustomTextInput from "../../components/TextInput";
import DropdownTextInput from "../../components/DropdownTextInput";

import { useAuthStore } from "../../zustand/authStore";
import { useSystemStore } from "../../zustand/systemStore";
import { hostUrl } from "../../services";
import colors from "../../constants/colors";
import styles from "./styles";

const RegisterForm = () => {
  const {
    email,
    role,
    picture,
    setName,
    setContact,
    setGender,
    setBuildingAddress,
    setLocality,
    setExactLocation,
    setIsNewUser,
  } = useAuthStore();

  const { locations } = useSystemStore();

  const initialFormData = {
    name: "",
    contact: "",
    buildingAddress: "",
    locality: "",
    gender: "M",
    exactLocation: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [selectedGender, setSelectedGender] = useState("M");

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    // Check if any field is empty
    if (
      !formData.name ||
      !formData.contact ||
      !formData.buildingAddress ||
      !formData.locality
    ) {
      Alert.alert("Error", "Please fill all the fields");
      return;
    }

    // Check if the contact number is 10 digits
    if (formData.contact.length !== 10) {
      Alert.alert("Error", "Contact number must be 10 digits");
      return;
    }

    setLoading(true);

    const apiData = {
      address: {
        buildingAddress: formData.buildingAddress,
        exactLocation: formData.exactLocation,
        locality: formData.locality,
      },
      contactNo: formData.contact,
      emailId: email,
      name: formData.name,
      role: role,
      gender: formData.gender,
    };

    try {
      const response = await fetch(`${hostUrl}/mazdoor/v1/updateProfile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiData),
      });

      if (response.ok) {
        const result = await response.json();
        Alert.alert("Success", "Registration successful");
        setName(formData.name);
        setContact(formData.contact);
        setBuildingAddress(formData.buildingAddress);
        setLocality(formData.locality);
        setExactLocation(formData.exactLocation);
        setFormData(initialFormData);
        setIsNewUser(false);
      } else {
        Alert.alert("Error", "Registration failed");
      }
    } catch (error) {
      Alert.alert("Error", "Error during registration");
      console.error("Error during registration", error);
    } finally {
      setLoading(false);
    }
  };

  const selectGender = (gender) => {
    setSelectedGender(gender);
    setFormData({ ...formData, gender });
    setGender(gender); // Update gender in Zustand state
  };

  return (
    <Modal visible={true} animationType="slide" transparent={true}>
      <StatusBar backgroundColor={colors.primary} />
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>Register Account</Text>
              <Text style={styles.subHeaderText}>
                Please provide all the necessary information.
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <TouchableOpacity
                style={[
                  styles.picture,
                  {
                    borderWidth: 0.2,
                    borderRadius: 20,
                    borderColor:
                      selectedGender === "M" ? "lightgray" : "transparent",
                    borderWidth: selectedGender === "M" ? 1 : 0,
                  },
                ]}
                onPress={() => selectGender("M")}
              >
                <Image
                  source={{
                    uri: "https://files.stickerkade.ir/7523/19.webp",
                  }}
                  style={styles.pictureImage}
                />
                <Text
                  style={{
                    fontSize: 12,
                    color: "gray",
                  }}
                >
                  Male
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.picture,
                  {
                    borderWidth: 0.2,
                    borderRadius: 20,
                    borderColor:
                      selectedGender === "F" ? "lightgray" : "transparent",
                    borderWidth: selectedGender === "F" ? 1 : 0,
                  },
                ]}
                onPress={() => selectGender("F")}
              >
                <Image
                  source={{
                    uri: "https://i.pinimg.com/736x/0f/10/55/0f105565e20366e9c76dec4a16d55a2b.jpg",
                  }}
                  style={styles.pictureImage}
                />
                <Text
                  style={{
                    fontSize: 12,
                    color: "gray",
                  }}
                >
                  Female
                </Text>
              </TouchableOpacity>
            </View>
            <CustomTextInput
              iconName="mark-email-read"
              iconType="mark-email-read"
              placeholder={email}
              value={email}
              editable={false} // Make sure to use `false` as a boolean
            />
            <CustomTextInput
              iconName="person-outline"
              iconType="Ionicons"
              placeholder="Name"
              value={formData.name}
              onChangeText={(text) => handleChange("name", text)}
            />
            <CustomTextInput
              iconName="call-outline"
              iconType="Ionicons"
              placeholder="Contact"
              value={formData.contact}
              onChangeText={(text) => handleChange("contact", text)}
              keyboardType="phone-pad"
            />

            <DropdownTextInput
              iconName="map"
              list={Object.keys(locations)}
              iconType="Ionicons"
              placeholder="Locality"
              value={formData.locality}
              onChangeText={(text) => handleChange("locality", text)}
            />

            <DropdownTextInput
              iconName="map"
              list={locations[formData.locality]}
              iconType="Ionicons"
              placeholder="Exact Location"
              value={formData.exactLocation}
              onChangeText={(text) => handleChange("exactLocation", text)}
            />
            <CustomTextInput
              iconName="location-outline"
              iconType="Ionicons"
              placeholder="Building Address"
              value={formData.buildingAddress}
              onChangeText={(text) => handleChange("buildingAddress", text)}
            />

            <TouchableOpacity
              style={styles.googleButton}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Register Now</Text>
              )}
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default RegisterForm;
