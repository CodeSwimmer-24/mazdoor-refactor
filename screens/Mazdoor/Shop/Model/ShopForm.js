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
import { Dropdown } from "react-native-element-dropdown"; // Assuming you're using this dropdown library

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
    "All categories",
  ]);
  const { email } = useAuthStore((state) => ({ email: state.email }));

  const initialFormData = {
    title: "",
    short_description: "",
    serviceType: "",
    basePrice: 0,
    sub_category: "All categories",
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

  console.log(subCategories);

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
      setSelectedSubCategories(["All categories"]); // Reset subcategories to default
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
          .map((item) => item.trim());
        setSubCategories(subCats);
      } else {
        setSubCategories([]);
      }
    }
  }, [selectedCategory, services]);

  const handleSubCategorySelect = (subCategory) => {
    let updatedSubCategories = [...selectedSubCategories];

    if (subCategory === "All categories") {
      updatedSubCategories = ["All categories"];
    } else {
      if (updatedSubCategories.includes("All categories")) {
        updatedSubCategories = updatedSubCategories.filter(
          (item) => item !== "All categories"
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
        updatedSubCategories = ["All categories"];
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
      const response = await fetch(`${hostUrl}/mazdoor/v1/addServiceProvider`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
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
                    {["All categories", ...subCategories].map((item, index) => {
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
              <Text style={styles.textLabel}>Enter Base Price</Text>
              <CustomTextInput
                iconType="MaterialIcons"
                iconName="currency-rupee"
                placeholder="Enter Base Price"
                value={formData.basePrice.toString()}
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
    fontWeight: "500",
    fontSize: 13,
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
    marginBottom: 40,
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
  subCategoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  subCategoryButton: {
    width: "48%",
    paddingVertical: 10,
    alignItems: "center",
    marginHorizontal: 5,
    marginVertical: 5,
    borderRadius: 5,
  },
  subCategorySelected: {
    backgroundColor: colors.primary,
  },
  subCategoryUnselected: {
    borderWidth: 0.5,
    borderColor: colors.primary,
  },
  subCategoryText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.primary,
  },
  subCategoryTextSelected: {
    color: "white",
  },
  subCategoryTextUnselected: {
    color: colors.primary,
  },
});

export default ShopForm;
