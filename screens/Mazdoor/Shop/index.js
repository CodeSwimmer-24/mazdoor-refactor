import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import colors from "../../../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome6 } from "@expo/vector-icons";
import { useAuthStore } from "../../../zustand/authStore";
import shop from "../../../assets/assets/shop.png";
import { AntDesign } from "@expo/vector-icons";
import ShopForm from "./Model/ShopForm";
import { hostUrl } from "../../../services";
import Services from "./components/Services";
import EditShopDetails from "./Model/EditShopDetails";
import { useServiceProviderStore } from "../../../zustand/serviceProviderStore";

const Shop = () => {
  const [loading, setLoading] = useState(true);
  const [shopRegisterForm, setShopRegisterForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [existingData, setExistingData] = useState(null);
  const [reload, setReload] = useState(false);
  const { email } = useAuthStore();

  // Zustand state
  const { serviceProvider, setServiceProvider } = useServiceProviderStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${hostUrl}/mazdoor/v1/getServiceProviderDetails?emailId=${email}`
        );
        const data = await response.json();
        setServiceProvider(data.serviceProvider);
      } catch (error) {
        console.error("Error fetching service provider details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [reload, email]);

  const handleEdit = () => {
    setExistingData(serviceProvider);
    setEditForm(true);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar backgroundColor="#f9f9f9" />
      <View style={styles.container}>
        {serviceProvider === null ? (
          <>
            <View style={styles.imageContainer}>
              <Image source={shop} style={styles.shopImage} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.titleText}>
                Register your Shop/Store in DigiMazdoor
              </Text>
              <Text style={styles.subtitleText}>
                Properly fill all the details while registering your app so that
                customers can book your service easily. Please fill the details!
              </Text>
              <TouchableOpacity
                onPress={() => setShopRegisterForm(true)}
                style={styles.addButton}
              >
                <AntDesign name="plus" size={24} color={colors.primary} />
                <Text style={styles.addButtonText}>Add Store</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <View style={styles.shopCard}>
              <View style={styles.shopDetails}>
                <Text style={styles.shopName}>{serviceProvider.title}</Text>
                <Text style={styles.description}>
                  {serviceProvider.short_description}
                </Text>
                <View style={styles.ratingContainer}>
                  <View style={styles.serviceTypeContainer}>
                    <Text style={styles.serviceTypeText}>
                      {serviceProvider.serviceType}
                    </Text>
                  </View>
                  <Text style={styles.rating}>🌟 {serviceProvider.rating}</Text>
                </View>
                <Text style={styles.basePrice}>
                  Base Price{" "}
                  <Text style={styles.basePriceValue}>
                    {serviceProvider.basePrice}/-
                  </Text>
                </Text>
                <Text style={styles.availability}>
                  {serviceProvider.availability ? "Available" : "Not Available"}
                </Text>
              </View>
              <View style={styles.editIconContainer}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={handleEdit}
                >
                  <FontAwesome6 name="edit" size={20} color={colors.primary} />
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <Services />
            </View>
          </>
        )}
        <ShopForm
          shopRegisterForm={shopRegisterForm}
          setShopRegisterForm={setShopRegisterForm}
          existingData={existingData}
          setReload={setReload}
        />
        <EditShopDetails
          editForm={editForm}
          setEditForm={setEditForm}
          existingData={existingData}
          setReload={setReload}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = {
  safeAreaView: {
    height: "100%",
    backgroundColor: colors.white,
  },
  container: {
    alignItems: "center",
    paddingHorizontal: 10,
  },
  imageContainer: {
    alignItems: "center",
    padding: 50,
  },
  shopImage: {
    height: 300,
    width: 300,
  },
  textContainer: {
    width: "80%",
  },
  titleText: {
    textAlign: "center",
    marginBottom: 10,
    fontSize: 20,
    fontWeight: "600",
    color: colors.baseColor,
  },
  subtitleText: {
    textAlign: "center",
    marginBottom: 40,
    fontSize: 14,
    fontWeight: "300",
    color: "gray",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.secondary,
    paddingVertical: 10,
    justifyContent: "center",
    borderRadius: 10,
  },
  addButtonText: {
    textAlign: "center",
    fontSize: 14,
    marginLeft: 10,
    fontWeight: "400",
    color: colors.primary,
  },
  shopCard: {
    width: "100%",
    backgroundColor: "#f9f9f9",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  shopDetails: {
    width: "80%",
  },
  shopName: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.baseColor,
  },
  description: {
    paddingVertical: 6,
    fontSize: 12,
    fontWeight: "300",
    color: "#505050",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  serviceTypeContainer: {
    marginTop: 10,
    backgroundColor: "#673de71a",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 50,
  },
  serviceTypeText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.primary,
  },
  rating: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.primary,
    marginLeft: 20,
  },
  basePrice: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "500",
    color: "#505050",
  },
  basePriceValue: {
    color: colors.primary,
  },
  availability: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "500",
    color: "green",
  },
  editIconContainer: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  editButton: {
    backgroundColor: "#673de71a",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 50,
  },
};

export default Shop;
