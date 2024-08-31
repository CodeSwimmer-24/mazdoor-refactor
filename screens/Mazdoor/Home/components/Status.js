import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import colors from "../../../../constants/colors";
import { useAuthStore } from "../../../../zustand/authStore";
import { hostUrl } from "../../../../services";

const Status = () => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(null);
  const [statusLoading, setStatusLoading] = useState(true);

  const { email } = useAuthStore();

  const data = [
    { label: "Available", value: true },
    { label: "Not Available", value: false },
  ];

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch(
          `${hostUrl}/mazdoor/v1/getServiceProviderDetails?emailId=${email}`
        );
        const result = await response.json();

        if (response.ok) {
          setCurrentStatus(result.serviceProvider.availability);
        }
      } catch (error) {
        Alert.alert("Error", "Failed to fetch current status.");
      } finally {
        setStatusLoading(false);
      }
    };

    fetchStatus();
  }, [email]);

  const updateStatus = async () => {
    if (value === null) {
      Alert.alert("Please select a status before updating.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${hostUrl}/mazdoor/v1/updateServiceProvider/${email}`,
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
        setCurrentStatus(value); // Update the current status
      } else {
        const errorData = await response.json();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={styles.label}>Your Status</Text>
        {statusLoading ? (
          <ActivityIndicator size="small" color={colors.primary} />
        ) : (
          <Text
            style={[
              styles.currentStatusText,
              {
                color: currentStatus ? "#4caf50" : colors.danger,
              },
            ]}
          >
            {currentStatus ? "Available" : "Not Available"}
          </Text>
        )}
      </View>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: colors.primary }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={data}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Select Status" : "..."}
        value={currentStatus}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          setIsFocus(false);
        }}
        renderLeftIcon={() => (
          <MaterialIcons
            style={styles.icon}
            color={isFocus ? colors.primary : colors.primary}
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
  },
  currentStatusText: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    fontSize: 14,
    fontWeight: "600",
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
});

export default Status;
