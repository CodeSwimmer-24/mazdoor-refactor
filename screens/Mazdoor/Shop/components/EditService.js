import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import colors from "../../../../constants/colors";
import { AntDesign } from "@expo/vector-icons";
import { hostUrl } from "../../../../services/index";

const EditService = ({
  isVisible,
  onClose,
  serviceId,
  serviceDetails,
  setReload,
}) => {
  const [serviceName, setServiceName] = useState(serviceDetails.serviceName);
  const [serviceDescription, setServiceDescription] = useState(
    serviceDetails.serviceDescription
  );
  const [price, setPrice] = useState(serviceDetails.price.toString());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setServiceName(serviceDetails.serviceName);
    setServiceDescription(serviceDetails.serviceDescription);
    setPrice(serviceDetails.price.toString());
  }, [serviceDetails]);

  const handleUpdateService = async () => {
    if (!serviceName || !serviceDescription || !price || isNaN(price)) {
      Alert.alert(
        "Validation Error",
        "Please fill in all fields with valid values."
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${hostUrl}/mazdoor/v1/updateService/${serviceId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            serviceName,
            serviceDescription,
            price: parseFloat(price), // Ensure price is sent as a number
          }),
        }
      );

      const responseData = await response.json();
      if (response.ok) {
        setReload((prev) => !prev);
        onClose();
      } else {
        console.error("Error updating service:", responseData);
        Alert.alert(
          "Update Failed",
          responseData.message ||
            "An error occurred while updating the service."
        );
      }
    } catch (error) {
      console.error("Error updating service:", error);
      Alert.alert(
        "Update Failed",
        "An error occurred while updating the service. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <TouchableOpacity onPress={onClose} style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.modalTitle}>Edit Service</Text>
            <TouchableOpacity onPress={onClose}>
              <AntDesign name="close" size={20} color={colors.danger} />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Service Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Service Name"
            value={serviceName}
            onChangeText={setServiceName}
          />

          <Text style={styles.label}>Service Description</Text>
          <TextInput
            style={styles.input}
            placeholder="Service Description"
            value={serviceDescription}
            onChangeText={setServiceDescription}
          />

          <Text style={styles.label}>Service Price</Text>
          <TextInput
            style={styles.input}
            placeholder="Price"
            value={price}
            onChangeText={(text) => {
              if (/^\d*\.?\d*$/.test(text)) {
                setPrice(text);
              }
            }}
            keyboardType="numeric"
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleUpdateService}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.buttonText}>Update Service</Text>
            )}
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "90%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
    color: colors.baseColor,
  },
  label: {
    fontSize: 12,
    paddingHorizontal: 5,
    color: "#505050",
  },
  input: {
    width: "100%",
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 5,
    marginVertical: 12,
    alignItems: "center",
    elevation: 5,
  },
  buttonText: {
    color: "white",
  },
});

export default EditService;
