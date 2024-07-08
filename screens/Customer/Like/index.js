import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useCustomerStore } from "../../../zustand/customerStore";
import ServiceCard from "../../../components/ServiceCard";
import LikeModal from "./LikeUi/LikeModal";

const Like = () => {
  const { favoriteSps } = useCustomerStore();
  const [isVisible, setIsVisible] = useState(false);
  const [favId, setFavID] = useState("");
  const [data, setData] = useState({
    name: "",
    email: "",
  });

  const wordSlice = (text) => {
    const words = text.split(" ");
    return words.length > 5 ? words.slice(0, 5).join(" ") + "..." : text;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#f9f9f9" />
      <View style={styles.header}>
        <Text style={styles.headerText}>Your Favorite</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.serviceCardsContainer}>
          {favoriteSps.map((sp, index) => (
            <ServiceCard
              key={index}
              id={index}
              onPress={() => {
                setFavID(sp.favoriteId);
                setIsVisible(true);
                setData({
                  name: sp.serviceProvider.title,
                  email: sp.serviceProvider.emailId,
                });
              }}
              name={sp.serviceProvider.title}
              category={sp.serviceProvider.serviceType}
              rating={sp.serviceProvider.rating}
              location={wordSlice(sp.serviceProvider.short_description)}
              price="200"
            />
          ))}
        </View>
      </ScrollView>
      {isVisible && (
        <LikeModal
          name={favoriteSps}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          favId={favId}
          data={data}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    height: 60,
    width: "100%",
    backgroundColor: "#f9f9f9",
    justifyContent: "center",
  },
  headerText: {
    marginVertical: 20,
    marginHorizontal: 20,
    fontSize: 18,
    fontWeight: "600",
    color: "#505050",
  },
  scrollViewContent: {
    alignItems: "center",
    paddingVertical: 20,
    paddingBottom: 60,
  },
  serviceCardsContainer: {
    width: "90%",
  },
});

export default Like;
