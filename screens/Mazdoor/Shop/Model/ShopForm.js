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

const ShopForm = ({
  shopRegisterForm,
  setShopRegisterForm,
  existingData,
  setReload,
}) => {
  const [loading, setLoading] = useState(false);
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

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const addServiceProvider = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${hostUrl}/mazdoor/v1/addServiceProvider`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          emailId: email,
          availability: true,
        }),
      });
      if (response.ok) {
        setShopRegisterForm(false);
        setReload((prev) => !prev);
      } else {
        console.error("Failed to add ServiceProvider");
      }
    } catch (error) {
      console.error("Error adding ServiceProvider:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={shopRegisterForm} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setShopRegisterForm(false)}
        />
        <View style={styles.modalContent}>
          <ScrollView>
            <View style={styles.header}>
              <Text style={styles.headerText}>Enter Shop Details</Text>
              <TouchableOpacity
                onPress={() => setShopRegisterForm(false)}
                style={styles.closeButton}
              >
                <Entypo name="cross" size={20} color={colors.danger} />
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 20, paddingHorizontal: 10 }}>
              <CustomTextInput
                iconName="store"
                placeholder="Enter Shop Name"
                value={formData.title}
                onChangeText={(text) => handleChange("title", text)}
              />
              <CustomTextInput
                iconType="Ionicons"
                iconName="hammer"
                placeholder="Enter Service Type"
                value={formData.serviceType}
                onChangeText={(text) => handleChange("serviceType", text)}
              />
              <CustomTextInput
                iconType="Ionicons"
                iconName="paper-plane-outline"
                placeholder="Enter Short Description"
                value={formData.short_description}
                onChangeText={(text) => handleChange("short_description", text)}
              />
              <CustomTextInput
                iconType="MaterialIcons"
                iconName="attach-money"
                placeholder="Enter Base Price"
                value={formData.basePrice.toString()}
                onChangeText={(text) => handleChange("basePrice", text)}
              />
            </View>
          </ScrollView>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={addServiceProvider}
              style={[styles.button, styles.confirmButton]}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? "Registering..." : "Register Shop"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
    height: height * 0.65,
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
});

export default ShopForm;
