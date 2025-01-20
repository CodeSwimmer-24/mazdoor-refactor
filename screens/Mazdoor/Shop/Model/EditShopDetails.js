import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import colors from "../../../../constants/colors";
import { useAuthStore } from "../../../../zustand/authStore";
import CustomTextInput from "../../../../components/TextInput";
import { hostUrl } from "../../../../services";

const EditShopDetails = ({
  editForm,
  setEditForm,
  existingData,
  setReload,
}) => {
  const [loading, setLoading] = useState(false);
  const { email } = useAuthStore((state) => ({ email: state.email }));

  // Initial state with only two fields: title and basePrice
  const [formData, setFormData] = useState({
    title: "",
    basePrice: 0,
  });

  // Populate form data with existing data when available
  useEffect(() => {
    if (existingData) {
      setFormData({
        title: existingData.title || "",
        basePrice: existingData.basePrice || 0,
      });
    }
  }, [existingData]);

  // Handler to update form data
  const handleChange = (name, value) => {
    if (name === "basePrice") {
      const parsedValue = parseFloat(value);
      setFormData({
        ...formData,
        [name]: isNaN(parsedValue) ? 0 : parsedValue,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Function to update service provider details
  const updateServiceProvider = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${hostUrl}/mazdoor/v1/updateServiceProvider/${email}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setEditForm(false);
        setReload((prev) => !prev);
      } else {
        const errorText = await response.text();
        console.error("Failed to update ServiceProvider:", errorText);
      }
    } catch (error) {
      console.error("Error updating ServiceProvider:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={editForm} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setEditForm(false)}
        />
        <ScrollView style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Edit Shop Details</Text>
            <TouchableOpacity
              onPress={() => setEditForm(false)}
              style={styles.closeButton}
            >
              <Entypo name="cross" size={20} color={colors.danger} />
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 20, paddingHorizontal: 10 }}>
            <Text style={styles.textLabel}>Enter Shop Name</Text>
            <CustomTextInput
              iconName="store"
              placeholder="Enter Shop Name"
              value={formData.title}
              onChangeText={(text) => handleChange("title", text)}
            />
            <Text style={styles.textLabel}>Enter Visiting Price</Text>
            <CustomTextInput
              iconType="MaterialIcons"
              iconName="currency-rupee"
              placeholder="Enter Visiting Price"
              value={formData.basePrice.toString()}
              onChangeText={(text) => handleChange("basePrice", text)}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={updateServiceProvider}
              style={[styles.button, styles.confirmButton]}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? "Updating..." : "Edit Details"}
              </Text>
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
    height: height * 0.35,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    borderTopWidth: 0.5,
    borderTopColor: "lightgray",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  headerText: {
    fontSize: 18,
    color: "gray",
  },
  closeButton: {
    backgroundColor: colors.dangerBackground,
    padding: 5,
    borderRadius: 50,
  },
  textLabel: {
    paddingVertical: 5,
    fontSize: 13,
    fontWeight: "500",
    color: colors.primary,
  },
  buttonContainer: {
    alignItems: "center",
    padding: 10,
  },
  button: {
    width: "100%",
    paddingVertical: 12,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  confirmButton: {
    backgroundColor: colors.primary,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default EditShopDetails;
