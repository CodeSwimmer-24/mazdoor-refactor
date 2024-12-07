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

import mail from "../../assets/assets/mail.png";
import femail from "../../assets/assets/femail.png";

import { useAuthStore } from "../../zustand/authStore";
import { useSystemStore } from "../../zustand/systemStore";
import { hostUrl } from "../../services";
import colors from "../../constants/colors";
import styles from "./styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";

const RegisterForm = () => {
  const {
    email,
    setName,
    setContact,
    setGender,
    setBuildingAddress,
    setLocality,
    setExactLocation,
    setIsNewUser,
    setRole
  } = useAuthStore();

  const { locations } = useSystemStore();

  // Initial form state
  const initialFormData = {
    name: "",
    contact: "",
    buildingAddress: "",
    locality: "",
    gender: "M",
    exactLocation: "",
    role: "customer",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [selectedGender, setSelectedGender] = useState("M");

  // Handle input changes
  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!formData.name || !formData.contact || !formData.locality) {
      Alert.alert("Error", "Please fill all the fields");
      return;
    }

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
      role: formData.role,
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
        setName(formData.name);
        setContact(formData.contact);
        setBuildingAddress(formData.buildingAddress);
        setLocality(formData.locality);
        setRole(formData.role)
        setExactLocation(formData.exactLocation);
        setGender(formData.gender);
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

  // Handle gender selection
  const selectGender = (gender) => {
    setSelectedGender(gender);
    handleChange("gender", gender);
  };

  // Handle role toggle
  const toggleRole = (role) => {
    handleChange("role", role);
  };

  return (
    <Modal visible={true} animationType="slide" transparent={true}>
      <StatusBar backgroundColor={colors.primary} />
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {/* Header */}
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>Register Account</Text>
              <Text style={styles.subHeaderText}>
                Please provide all the necessary information.
              </Text>
            </View>

            {/* Gender Selection */}
            <View style={styles.genderSelectionContainer}>
              <TouchableOpacity
                style={[
                  styles.picture,
                  selectedGender === "M" && styles.selectedPicture,
                ]}
                onPress={() => selectGender("M")}
              >
                <Image source={mail} style={styles.pictureImage} />
                <Text style={styles.genderText}>Male</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.picture,
                  selectedGender === "F" && styles.selectedPicture,
                ]}
                onPress={() => selectGender("F")}
              >
                <Image source={femail} style={styles.pictureImage} />
                <Text style={styles.genderText}>Female</Text>
              </TouchableOpacity>
            </View>

            {/* Input Fields */}
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

            {/* Role Selection */}
            <View style={styles.roleToggleContainer}>
              <TouchableOpacity
                style={[
                  styles.roleButton,
                  formData.role === "customer" && styles.selectedRoleButton,
                ]}
                onPress={() => {
                  toggleRole("customer")
                }}
              >
                <AntDesign name="user" size={20} color={formData.role === "mazdoor" ? colors.primary : colors.white} />
                <Text
                  style={[
                    styles.roleText,
                    formData.role === "customer" && styles.selectedRoleText,
                  ]}
                >
                  Customer
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  toggleRole("mazdoor")
                }}
                style={[
                  styles.roleButton,
                  formData.role === "mazdoor" && styles.selectedRoleButton,
                ]}

              >
                <Ionicons name="hammer-outline" size={20} color={formData.role === "customer" ? colors.primary : colors.white} />
                <Text
                  style={[
                    styles.roleText,
                    formData.role === "mazdoor" && styles.selectedRoleText,
                  ]}
                >
                  Mazdoor (कारीगर)
                </Text>
              </TouchableOpacity>
            </View>
            {formData.role === "mazdoor" && (
              <View>
                <CustomTextInput
                  iconName="man"
                  iconType="Ionicons"
                  placeholder="Age"
                  value={formData.age}
                  onChangeText={(text) => handleChange("age", text)}
                  keyboardType="phone-pad"
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
              </View>
            )}
            {/* Submit Button */}
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
