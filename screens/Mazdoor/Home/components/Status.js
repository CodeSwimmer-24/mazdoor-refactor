import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useNavigation } from "@react-navigation/native";
import colors from "../../../../constants/colors";
import { hostUrl } from "../../../../services";
import { useServiceProviderStore } from "../../../../zustand/serviceProviderStore";

const Status = () => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const { serviceProvider } = useServiceProviderStore();

  const handleRegisterPress = () => {
    // Navigate to the Shop tab
    navigation.navigate("Shop");
  };

  const data = [
    { label: "Available", value: true },
    { label: "Not Available", value: false },
  ];

  const updateStatus = async () => {
    if (value === null) {
      Alert.alert("Please select a status before updating.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${hostUrl}/mazdoor/v1/updateServiceProvider/${serviceProvider.email}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            availability: value,
          }),
        }
      );

      if (response.ok) {
        Alert.alert("Status Updated Successfully");
      } else {
        Alert.alert("Failed to update status.");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!serviceProvider) {
    return (
      <View style={styles.registrationContainer}>
        <Text style={styles.registrationTitle}>Service Registration</Text>
        <Text style={styles.registrationText}>
          कृपया अपनी दुकान को DigiMazdoor पर रजिस्टर करें।
        </Text>
        <TouchableOpacity
          onPress={handleRegisterPress}
          style={styles.registerButton}
        >
          <Text style={styles.registerButtonText}>
            Please Register your shop...
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.statusLabel}>Your Status</Text>
      <Dropdown
        data={data}
        labelField="label"
        valueField="value"
        placeholder="Select Status"
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => setValue(item.value)}
        style={styles.dropdown}
      />
      <TouchableOpacity
        onPress={updateStatus}
        disabled={loading}
        style={[styles.updateButton, loading && styles.disabledButton]}
      >
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={styles.updateButtonText}>Update</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Status;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  registrationContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  registrationTitle: {
    paddingTop: 10,
    fontSize: 32,
    color: colors.primary,
    fontWeight: "400",
  },
  registrationText: {
    paddingVertical: 10,
    fontSize: 14,
    color: colors.primary,
    fontWeight: "400",
    paddingHorizontal: 20,
  },
  registerButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 80,
    paddingVertical: 10,
    marginTop: 10,
    borderRadius: 10,
    elevation: 5,
  },
  registerButtonText: {
    color: "white",
  },
  statusLabel: {
    fontSize: 18,
    marginBottom: 10,
    color: colors.primary,
  },
  dropdown: {
    marginBottom: 20,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 8,
  },
  updateButton: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  updateButtonText: {
    color: "white",
    fontWeight: "600",
  },
  disabledButton: {
    opacity: 0.7,
  },
});
