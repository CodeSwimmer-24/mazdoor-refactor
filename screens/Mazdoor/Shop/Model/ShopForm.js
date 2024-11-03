import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { Entypo, FontAwesome6 } from "@expo/vector-icons";
import colors from "../../../../constants/colors";
import { useAuthStore } from "../../../../zustand/authStore";
import CustomTextInput from "../../../../components/TextInput";
import { hostUrl } from "../../../../services";
import { Dropdown } from "react-native-element-dropdown";

const ShopForm = ({
  shopRegisterForm,
  setShopRegisterForm,
  existingData,
  setReload,
}) => {
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([
    "All Categories",
  ]);
  const { email } = useAuthStore((state) => ({ email: state.email }));

  const initialFormData = {
    title: "",
    short_description: "",
    serviceType: "",
    basePrice: 0,
    sub_category: "All Categories",
    availability: true,
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (existingData) {
      setFormData(existingData);
      setSelectedSubCategories(existingData.subCategory.split(", "));
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
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "serviceType") {
      setSelectedCategory(value);
      setSelectedSubCategories(["All Categories"]);
    }
  };

  useEffect(() => {
    if (selectedCategory) {
      const selectedService = services.find(
        (service) => service.value === selectedCategory
      );
      if (selectedService) {
        const subCats = selectedService.sub_category
          .split(", ")
          .map((item) => item.trim())
          .filter((item) => item !== "All Categories"); // Exclude "All Categories" from UI
        setSubCategories(subCats);
      } else {
        setSubCategories([]);
      }
    }
  }, [selectedCategory, services]);

  const handleSubCategorySelect = (subCategory) => {
    let updatedSubCategories = [...selectedSubCategories];

    if (subCategory === "All Categories") {
      updatedSubCategories = ["All Categories"];
    } else {
      if (updatedSubCategories.includes("All Categories")) {
        updatedSubCategories = updatedSubCategories.filter(
          (item) => item !== "All Categories"
        );
      }

      if (updatedSubCategories.includes(subCategory)) {
        updatedSubCategories = updatedSubCategories.filter(
          (item) => item !== subCategory
        );
      } else {
        updatedSubCategories.push(subCategory);
      }

      if (updatedSubCategories.length === 0) {
        updatedSubCategories = ["All Categories"];
      }
    }

    setSelectedSubCategories(updatedSubCategories);
    setFormData((prevData) => ({
      ...prevData,
      subCategory: updatedSubCategories.join(", "),
    }));
  };

  const addServiceProvider = async () => {
    if (
      formData.title.trim() === "" ||
      formData.short_description.trim() === "" ||
      formData.serviceType === "" ||
      formData.basePrice <= 0
    ) {
      Alert.alert("Error", "Please enter all the required information");
      return;
    }

    try {
      setLoading(true);

      // Ensure "All Categories" is included in the sub_category string
      const subCategoryString = [
        "All Categories",
        ...selectedSubCategories.filter((item) => item !== "All Categories"),
      ].join(", ");

      const response = await fetch(`${hostUrl}/mazdoor/v1/addServiceProvider`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          subCategory: subCategoryString,
          emailId: email,
          basePrice: parseFloat(formData.basePrice),
        }),
      });

      if (response.ok) {
        setShopRegisterForm(false);
        setReload((prev) => !prev);
      } else {
        Alert.alert("Error", "Failed to add ServiceProvider");
      }
    } catch (error) {
      console.error("Error adding ServiceProvider:", error);
      Alert.alert(
        "Error",
        "An error occurred while adding the ServiceProvider"
      );
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
        <ScrollView style={styles.modalContent}>
          <View>
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
              <Text style={styles.textLabel}>Enter Shop Name</Text>
              <CustomTextInput
                iconName="store"
                placeholder="Enter Shop Name"
                value={formData.title}
                onChangeText={(text) => handleChange("title", text)}
              />
              <Text style={styles.textLabel}>Enter Work Category</Text>
              <Dropdown
                style={styles.dropdownButton}
                placeholderStyle={{ color: "#D0D0D0" }}
                selectedTextStyle={{ color: colors.primary }}
                iconStyle={{ color: "gray" }}
                data={services}
                search
                searchPlaceholder="Search..."
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={formData.serviceType || "Select Category"}
                value={formData.serviceType}
                onChange={(item) => handleChange("serviceType", item.value)}
                renderLeftIcon={() => (
                  <FontAwesome6
                    name="hammer"
                    size={14}
                    color="lightgray"
                    style={styles.icon}
                  />
                )}
                renderRightIcon={() => (
                  <Entypo
                    name="chevron-small-down"
                    size={24}
                    color="gray"
                    style={styles.icon}
                  />
                )}
              />

              {subCategories.length > 0 && (
                <View>
                  <Text style={styles.textLabel}>Sub Categories</Text>
                  <View style={styles.subCategoryContainer}>
                    {subCategories.map((item, index) => {
                      const isSelected = selectedSubCategories.includes(item);
                      return (
                        <TouchableOpacity
                          key={index}
                          style={[
                            styles.subCategoryButton,
                            isSelected
                              ? styles.subCategorySelected
                              : styles.subCategoryUnselected,
                          ]}
                          onPress={() => handleSubCategorySelect(item)}
                        >
                          <Text
                            style={[
                              styles.subCategoryText,
                              isSelected && styles.subCategoryTextSelected,
                            ]}
                          >
                            {item}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              )}

              <Text style={styles.textLabel}>Enter Short Description</Text>
              <CustomTextInput
                iconType="Ionicons"
                iconName="paper-plane-outline"
                placeholder="Enter Short Description"
                value={formData.short_description}
                onChangeText={(text) => handleChange("short_description", text)}
              />
              <Text style={styles.textLabel}>Enter Visiting Charge</Text>
              <CustomTextInput
                iconType="MaterialIcons"
                iconName="currency-rupee"
                placeholder="Enter Visiting Charge"
                value={
                  formData.basePrice === 0 ? "" : formData.basePrice.toString()
                }
                onChangeText={(text) => handleChange("basePrice", text)}
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
                {loading ? "Registering..." : "Register Shop"}
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
    height: height * 0.7,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    elevation: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.primary,
  },
  closeButton: {
    padding: 5,
  },
  textLabel: {
    fontSize: 14,
    marginBottom: 5,
    color: colors.primary,
  },
  dropdownButton: {
    height: 50,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  subCategoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  subCategoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    borderWidth: 1.5,
    margin: 5,
  },
  subCategoryText: {
    fontSize: 12,
    color: colors.primary,
  },
  subCategorySelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  subCategoryUnselected: {
    backgroundColor: "white",
    borderColor: colors.primary,
  },
  subCategoryTextSelected: {
    color: "white",
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  confirmButton: {
    backgroundColor: colors.primary,
  },
  buttonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
  },
});

export default ShopForm;
