import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import colors from "../../../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { hostUrl } from "../../../../services";
import { useAuthStore } from "../../../../zustand/authStore";
import { useStatusStore } from "../../../../zustand/statusStore";

const Status = ({ serviceProviderData, reloadData }) => {
  const { status, setStatus } = useStatusStore(); // Use Zustand store
  const [loading, setLoading] = useState(false);

  const { email } = useAuthStore();
  const navigation = useNavigation();
  const data = [
    { label: "Online", value: true },
    { label: "Offline", value: false },
  ];

  const handleRegisterPress = () => {
    navigation.navigate("Shop");
  };

  const updateStatus = async () => {
    if (status === null) {
      Alert.alert("Please select a status before updating.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${hostUrl}/mazdoor/v1/updateSPStatus?availability=${status}&emailId=${email}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();
      if (response.ok) {
        Alert.alert("Status Updated Successfully");
        reloadData(); // Refresh data in parent component
      } else {
        Alert.alert("Failed to update status.", result?.message || "");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      Alert.alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initialize status from data if not already set
    if (status === null && serviceProviderData?.availability !== undefined) {
      setStatus(serviceProviderData.availability);
    }
  }, [serviceProviderData, status, setStatus]);

  return (
    <View style={styles.container}>
      {serviceProviderData === null ? (
        <View style={styles.registrationContainer}>
          <Text style={styles.registrationTitle}>Service Registration</Text>
          <Text style={styles.registrationText}>
            कृपया अपनी दुकान/काम को DigiMazdoor पर रजिस्टर करें।
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
      ) : (
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={styles.label}>Set Your Status</Text>
            {status ? (
              <Text style={{ fontWeight: "600", color: "#49cc90" }}>
                Online
              </Text>
            ) : (
              <Text style={{ fontWeight: "600", color: colors.danger }}>
                Offline
              </Text>
            )}
          </View>
          <Dropdown
            style={[styles.dropdown, { borderColor: colors.primary }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={data}
            labelField="label"
            valueField="value"
            placeholder="Select your status"
            value={status}
            onChange={(item) => setStatus(item.value)} // Use Zustand setter
            renderLeftIcon={() => (
              <MaterialIcons
                style={styles.icon}
                color={colors.primary}
                name="assignment"
                size={20}
              />
            )}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={updateStatus}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color={colors.white} />
            ) : (
              <Text style={styles.buttonText}>Update</Text>
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    fontSize: 16,
    fontWeight: "600",
    color: colors.baseColor,
    marginRight: 10,
  },
  dropdown: {
    height: 50,
    borderColor: "lightgray",
    borderWidth: 0.5,
    borderRadius: 8,
    marginHorizontal: 10,
    paddingHorizontal: 12,
  },
  icon: {
    marginRight: 10,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "gray",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: colors.primary,
  },
  button: {
    marginTop: 20,
    backgroundColor: colors.primary,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 10,
    elevation: 5,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "400",
  },
  registrationContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  registrationTitle: {
    fontSize: 32,
    fontWeight: "400",
    color: colors.baseColor,
    marginBottom: 10,
  },
  registrationText: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 10,
    color: "gray",
  },
  registerButton: {
    marginTop: 20,
    backgroundColor: colors.primary,
    width: "80%",
    paddingVertical: 12,
    borderRadius: 8,
    elevation: 5,
  },
  registerButtonText: {
    color: colors.white,
    fontSize: 14,
    textAlign: "center",
  },
});

export default Status;
