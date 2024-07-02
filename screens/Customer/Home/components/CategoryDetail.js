import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import { Entypo, AntDesign } from "@expo/vector-icons";
import ServiceCard from "../../../../components/ServiceCard";
import colors from "../../../../constants/colors";
import { hostUrl } from "../../../../services";
import noData from "../../../../assets/assets/NoBooking.png";
import { useIsFocused } from "@react-navigation/native";

const CategoryDetail = ({ route, navigation }) => {
  const isFocused = useIsFocused();
  const { label } = route.params;
  const [serviceProviders, setServiceProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServiceProviders = async () => {
      try {
        const response = await axios.get(
          `${hostUrl}/mazdoor/v1/getAllServiceProviders?exactLocation=%20&locality=Shaheen%20Bagh&serviceType=${label}`
        );
        setServiceProviders(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchServiceProviders();
  }, []);

  //   useEffect(() => {
  //     const parent = navigation.getParent();
  //     if (isFocused) {
  //       parent?.setOptions({
  //         tabBarStyle: { display: "none" },
  //       });
  //     } else {
  //       parent?.setOptions({
  //         tabBarStyle: { display: "flex" },
  //       });
  //     }
  //   }, [isFocused, navigation]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
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
          <TouchableOpacity>
            <AntDesign name="filter" size={28} color={colors.white} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <View style={styles.content}>
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
                  price="200"
                  onPress={() =>
                    navigation.push("ServiceDetail", {
                      emailId: item.emailId,
                    })
                  }
                />
              </View>
            ))
          ) : (
            <View style={styles.noDataContainer}>
              <Image source={noData} style={styles.noDataImage} />
              <Text style={styles.noDataTitle}>Opps!</Text>
              <Text style={styles.noDataSubtitle}>
                No data is available in this location
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
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
  content: {
    alignItems: "center",
  },
  scrollView: {
    width: "90%",
  },
  cardContainer: {
    marginVertical: 5,
    marginHorizontal: 5,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  noDataImage: {
    height: 300,
    width: 300,
  },
  noDataTitle: {
    marginTop: 20,
    fontSize: 40,
    fontWeight: "600",
    color: colors.primary,
  },
  noDataSubtitle: {
    marginTop: 5,
    fontSize: 18,
    fontWeight: "300",
    color: "gray",
  },
});

export default CategoryDetail;
