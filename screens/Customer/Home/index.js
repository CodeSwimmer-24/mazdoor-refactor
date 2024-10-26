import { useEffect, useState } from "react";
import React from "react";
import { View, StyleSheet, ScrollView, StatusBar } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuthStore } from "../../../zustand/authStore";
import colors from "../../../constants/colors";
import Header from "./components/Header";
import Banner from "./components/Banner";
import Category from "./components/Category";
// import TopRated from "./components/TopRated";
import CategoryDetail from "./screens/CategoryDetail";
import ServiceDetail from "./screens/ServiceDetail";
import { getTabBarOptions } from "../../../constants/tabBarStyles";
import { useIsFocused } from "@react-navigation/native";
import Booking from "../Booking";
import Notification from "../../../components/Notification";

const Stack = createNativeStackNavigator();

const HomeMain = ({ navigation }) => {
  const isFocused = useIsFocused();
  const { name, buildingAddress, locality } = useAuthStore();
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  useEffect(() => {
    if (isFocused) {
      const parent = navigation.getParent();
      parent?.setOptions({
        tabBarStyle: { display: "flex" },
        ...getTabBarOptions(),
      });
    }
  }, [isFocused]);

  return (
    <>
      <View style={styles.container}>
        <StatusBar backgroundColor="#f9f9f9" />
        <Header
          name={name}
          buildingAddress={buildingAddress}
          locality={locality}
          setIsDrawerVisible={setIsDrawerVisible}
          isDrawerVisible={isDrawerVisible}
        />

        <ScrollView>
          <Banner />
          <Category navigation={navigation} />

          {/* <TopRated /> */}
        </ScrollView>
      </View>
      {isDrawerVisible && (
        <Notification
          isVisible={isDrawerVisible}
          setIsVisible={setIsDrawerVisible}
        />
      )}
    </>
  );
};

const Home = () => {
  return (
    <Stack.Navigator initialRouteName="HomeMain">
      <Stack.Screen
        name="HomeMain"
        component={HomeMain}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CategoryDetail"
        component={CategoryDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ServiceDetail"
        component={ServiceDetail}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: colors.white,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
});

export default Home;
