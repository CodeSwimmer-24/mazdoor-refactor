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
import { Entypo, FontAwesome6 } from "@expo/vector-icons";
import colors from "../../../../constants/colors";
import { useAuthStore } from "../../../../zustand/authStore";
import CustomTextInput from "../../../../components/TextInput";
import { hostUrl } from "../../../../services";
import { Dropdown } from "react-native-element-dropdown";

const EditShopDetails = ({
  editForm,
  setEditForm,
  existingData,
  setReload,
}) => {
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState([]);
  const { email } = useAuthStore((state) => ({ email: state.email }));

  const initialFormData = {
    title: "",
    short_description: "",
    serviceType: "",
    basePrice: 0,
    availability: true,
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (existingData) {
      setFormData(existingData);
    }
  }, [existingData]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch(`${hostUrl}/mazdoor/v1/getAllServices`);
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const handleChange = (name, value) => {
    if (name === "basePrice") {
      const parsedValue = parseFloat(value);
      setFormData({
        ...formData,
        [name]: isNaN(parsedValue) ? value : parsedValue,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const addServiceProvider = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${hostUrl}/mazdoor/v1/updateServiceProvider/${email}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            availability: true,
          }),
        }
      );
      if (response.ok) {
        setEditForm(false);
        setReload((prev) => !prev);
      } else {
        console.error("Failed to update ServiceProvider");
      }
    } catch (error) {
      console.error("Error updating ServiceProvider:", error);
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
          <View>
            <View style={styles.header}>
              <Text style={styles.headerText}>Enter Shop Details</Text>
              <TouchableOpacity
                onPress={() => setEditForm(false)}
                style={styles.closeButton}
              >
                <Entypo name="cross" size={20} color={colors.danger} />
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 20, paddingHorizontal: 10 }}>
              <Text style={styles.textLabel}>Enter Shop Details</Text>
              <CustomTextInput
                iconName="store"
                placeholder="Enter Shop Name"
                value={formData.title}
                onChangeText={(text) => handleChange("title", text)}
              />
              <Text style={styles.textLabel}>Enter Shop Discription</Text>
              <CustomTextInput
                iconType="Ionicons"
                iconName="paper-plane-outline"
                placeholder="Enter Short Description"
                value={formData.short_description}
                onChangeText={(text) => handleChange("short_description", text)}
              />
              <Text style={styles.textLabel}>Enter Base Price</Text>
              <CustomTextInput
                iconType="MaterialIcons"
                iconName="currency-rupee"
                placeholder="Enter Base Price"
                value={formData.basePrice.toString()}
                onChangeText={(text) => handleChange("basePrice", text)}
                keyboardType="numeric"
              />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={addServiceProvider}
              style={[styles.button, styles.confirmButton]}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? "Registering..." : "Edit Details"}
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
    overflow: "hidden",
    borderTopWidth: 0.5,
    borderTopColor: "lightgray",
  },
  header: {
    padding: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 18,
    color: "gray",
  },
  textLabel: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    fontSize: 13,
    fontWeight: "500",
    color: colors.primary,
  },
  closeButton: {
    backgroundColor: colors.dangerBackground,
    padding: 5,
    borderRadius: 50,
  },
  buttonContainer: {
    alignItems: "center",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  confirmButton: {
    backgroundColor: colors.primary,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "400",
  },
  dropdownButton: {
    borderWidth: 1,
    borderColor: "#D0D0D0",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
});

export default EditShopDetails;
