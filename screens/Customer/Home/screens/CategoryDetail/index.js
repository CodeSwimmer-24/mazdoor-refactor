import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import { Entypo, AntDesign, Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import ServiceCard from "../../../../../components/ServiceCard";
import colors from "../../../../../constants/colors";
import { hostUrl } from "../../../../../services";
import NotFound from "../../../../../components/NotFound";
import { useAuthStore } from "../../../../../zustand/authStore";
import Filter from "../../../../../components/Filter";

const CategoryDetail = ({ route, navigation }) => {
  const { label, subCategory } = route.params;
  const isFocused = useIsFocused();
  const [serviceProviders, setServiceProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { locality } = useAuthStore();
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [filterLocation, setFilterLocation] = useState(locality);
  const [filterExactLocation, setFilterExactLocation] = useState({
    locality: locality,
    exact: "All",
  });

  const newSubCategory = subCategory
    ? subCategory.split(",").map((item) => item.trim())
    : [];
  const [selectedSubCategory, setSelectedSubCategory] = useState(
    newSubCategory[0] || ""
  );

  const [subCategoryData, setSubCategoryData] = useState(
    newSubCategory[0] || "All categories"
  );

  const fetchServiceProviders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${hostUrl}/mazdoor/v1/getAllServiceProviders?exactLocation=${filterExactLocation.exact}&locality=${filterLocation}&serviceType=${label}&subCategory=${subCategoryData}`
      );
      setServiceProviders(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServiceProviders();
  }, [filterExactLocation, filterLocation, subCategoryData]);

  useEffect(() => {
    console.log("Catdetail", isFocused);
    const parent = navigation.getParent();
    parent?.setOptions({
      tabBarStyle: { display: "none" },
    });
  }, [isFocused]);

  if (!subCategory) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.primary} />
      <SafeAreaView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Entypo name="chevron-left" size={28} color={colors.white} />
          </TouchableOpacity>
          <Text style={styles.headerText}>{label}</Text>
          <TouchableOpacity onPress={() => setIsFilterVisible(true)}>
            <AntDesign name="filter" size={28} color={colors.white} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <View style={styles.currentLocation}>
        <Ionicons name="location-sharp" size={20} color="#c8c8c8" />
        <Text style={styles.locationText}>
          {`${filterLocation},  ${filterExactLocation.exact}`}
        </Text>
      </View>
      <View style={styles.subCategoryScrollView}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.subCategoryContainer}>
            {newSubCategory?.map((item) => {
              const isSelected = selectedSubCategory === item;
              return (
                <TouchableOpacity
                  key={item}
                  style={[
                    styles.subCategoryButton,
                    isSelected
                      ? { backgroundColor: colors.primary }
                      : { borderColor: colors.primary, borderWidth: 1 },
                  ]}
                  onPress={() => {
                    setSelectedSubCategory(item);
                    setSubCategoryData(item);
                  }}
                >
                  <Text
                    style={[
                      styles.subCategoryText,
                      isSelected
                        ? { color: colors.white }
                        : { color: colors.primary },
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator
            style={{
              marginTop: "50%",
            }}
            size="large"
            color={colors.primary}
          />
        ) : (
          <ScrollView style={styles.scrollView}>
            {serviceProviders.length > 0 ? (
              serviceProviders.map((item, index) => (
                <View key={index} style={styles.cardContainer}>
                  <ServiceCard
                    id={index}
                    name={item.title}
                    category={label}
                    rating={item.rating}
                    location={item.short_description}
                    price={item.basePrice}
                    onPress={() =>
                      navigation.push("ServiceDetail", {
                        emailId: item.emailId,
                      })
                    }
                  />
                </View>
              ))
            ) : (
              <NotFound />
            )}
          </ScrollView>
        )}
      </View>
      <Filter
        filterLocation={filterLocation}
        filterExactLocation={filterExactLocation}
        setFilterExactLocation={setFilterExactLocation}
        setFilterLocation={setFilterLocation}
        isFilterVisible={isFilterVisible}
        setIsFilterVisible={setIsFilterVisible}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: colors.white,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: colors.primary,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    color: colors.white,
  },
  currentLocation: {
    alignItems: "center",
    paddingHorizontal: 25,
    paddingBottom: 10,
    flexDirection: "row",
  },
  locationText: {
    paddingHorizontal: 6,
    fontSize: 14,
    color: "#c8c8c8",
    fontWeight: "500",
  },
  subCategoryScrollView: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  subCategoryContainer: {
    flexDirection: "row",
  },
  subCategoryButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    borderRadius: 50,
  },
  subCategoryText: {
    fontSize: 12,
    fontWeight: "600",
  },
  content: {
    alignItems: "center",
    marginBottom: 50,
  },
  scrollView: {
    width: "90%",
  },
  cardContainer: {
    marginVertical: 5,
    marginHorizontal: 5,
  },
});

export default CategoryDetail;
