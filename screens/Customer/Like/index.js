import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useAuthStore } from "../../../zustand/authStore";
import { useCustomerStore } from "../../../zustand/customerStore";
import ServiceCard from "../../../components/ServiceCard";
import LikeModal from "./components/LikeModal";
import NotFound from "../../../components/NotFound";

const Like = ({ navigation }) => {
  const { email } = useAuthStore();
  const { favoriteSps, setFavoriteSps } = useCustomerStore();

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
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>My Favorite</Text>
        <Text style={styles.subHeaderText}>
          The list of service provider you Like.
        </Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {favoriteSps.length > 0 ? (
          <View style={styles.serviceCardsContainer}>
            {favoriteSps.map((sp, index) => (
              <ServiceCard
                key={sp.favoriteId}
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
                availability={sp.serviceProvider.availability}
                location={wordSlice(sp.serviceProvider.short_description)}
                price="200"
              />
            ))}
          </View>
        ) : (
          <>
            <NotFound
              image="nolike"
              info="You dont have any favorate service"
            />
          </>
        )}
      </ScrollView>
      {isVisible && (
        <LikeModal
          name={favoriteSps}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          favId={favId}
          email={email}
          setFavoriteSps={setFavoriteSps}
          data={data}
          navigation={navigation}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "white",
  },
  headerContainer: {
    backgroundColor: "#f9f9f9",
    paddingVertical: 16,
    paddingHorizontal: 10,
  },
  headerText: {
    paddingHorizontal: 20,
    fontSize: 20,
    fontWeight: "600",
    color: "#505050",
  },
  subHeaderText: {
    paddingHorizontal: 20,
    paddingTop: 5,
    fontSize: 12,
    fontWeight: "300",
    color: "gray",
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
