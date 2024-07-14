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
import { useSystemStore } from "../../../zustand/systemStore";
import { useAuthStore } from "../../../zustand/authStore";
import { hostUrl } from "../../../services";
import CustomTextInput from "../../../components/TextInput";
import DropdownTextInput from "../../../components/DropdownTextInput";
import colors from "../../../constants/colors";
import styles from "../../Register/styles";

const MazdoorRegister = () => {
  const {
    email,
    role,
    picture,
    setName,
    setContact,
    setGender,
    setAge,
    setAadharNo,
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
    aadharNo: "",
    age: "",
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
      !formData.locality ||
      !formData.age ||
      !formData.exactLocation
    ) {
      Alert.alert("Error", "Please fill all the fields");
      return;
    }

    if (formData.contact.length !== 10) {
      Alert.alert("Error", "Contact number must be 10 digits");
      return;
    }

    if (formData.aadharNo.length !== 12) {
      Alert.alert("Error", "Aadhar number must be 12 digits");
      return;
    }

    if (formData.age.length !== 2) {
      Alert.alert("Error", "Age must be exactly 2 digits");
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
      aadharNo: formData.aadharNo,
      age: formData.age,
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
        setAadharNo(formData.aadharNo);
        setAge(formData.age);
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
              <Text style={styles.headerText}>Mazdoor Registration</Text>
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
                    borderWidth: 0.4,
                    borderRadius: 10,
                    borderColor:
                      selectedGender === "M" ? "lightgray" : "transparent",
                    borderWidth: selectedGender === "M" ? 1 : 0,
                  },
                ]}
                onPress={() => selectGender("M")}
              >
                <Image
                  source={{
                    uri: "https://www.pngitem.com/pimgs/m/99-994041_worker-man-construction-worker-hd-png-download.png",
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
                    borderWidth: 0.4,
                    borderRadius: 10,
                    borderColor:
                      selectedGender === "F" ? "lightgray" : "transparent",
                    borderWidth: selectedGender === "F" ? 1 : 0,
                  },
                ]}
                onPress={() => selectGender("F")}
              >
                <Image
                  source={{
                    uri: "https://www.familyhandyman.com/wp-content/uploads/2021/03/woman-construction-worker-GettyImages-463207617.jpg",
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
            <CustomTextInput
              iconName="document-text-outline"
              iconType="Ionicons"
              placeholder="Aadhar Number"
              value={formData.aadharNo}
              onChangeText={(text) => handleChange("aadharNo", text)}
              keyboardType="phone-pad"
            />
            <CustomTextInput
              iconName="people"
              iconType="Ionicons"
              placeholder="Age"
              value={formData.age}
              onChangeText={(text) => handleChange("age", text)}
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

export default MazdoorRegister;
