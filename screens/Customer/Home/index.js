import { useEffect } from "react";
import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  Button
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuthStore } from "../../../zustand/authStore";
import { passSignOutProp } from "../../../helpers";
import colors from "../../../constants/colors";
import Header from "./components/Header";
import Banner from "./components/Banner";
import Category from "./components/Category";
import TopRated from "./components/TopRated";
import CategoryDetail from "./screens/CategoryDetail";
import ServiceDetail from "./screens/ServiceDetail";
import { getTabBarOptions } from "../../../constants/tabBarStyles";
import { getFavoriteSPs } from "../../../services";
import { useCustomerStore } from "../../../zustand/customerStore";

const Stack = createNativeStackNavigator();

const HomeMain = ({ signOut, navigation }) => {
  const { email, name, isNewUser, buildingAddress, locality } =
    useAuthStore((state) => ({
      email: state.email,
      name: state.name,
      isNewUser: state.isNewUser,
      buildingAddress: state.buildingAddress,
      locality: state.locality,
    }));

  const { favoriteSps, setFavoriteSps } = useCustomerStore();

  useEffect(() => {
    console.log("navigation")
    const parent = navigation.getParent();
    parent?.setOptions({
      tabBarStyle: { display: "flex" },
      ...getTabBarOptions(),
    });

    if (false) {
      if (!favoriteSps.length) {
        console.log("HOME", "Getting fav Sps");
        getFavoriteSPs(email)
          .then(sps => setFavoriteSps(sps))
          .catch(err => console.log(err.response.data));
      }
    }
  }, [isNewUser]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#f9f9f9" />
      <Header
        name={name}
        buildingAddress={buildingAddress}
        locality={locality}
      />
      <Button onPress={signOut} title="Logout" />
      <ScrollView>
        <Banner />
        <Category navigation={navigation} />
        <TopRated />
      </ScrollView>
    </View>
  );
};

const Home = ({ signOut }) => {
  return (
    <Stack.Navigator initialRouteName="HomeMain">
      <Stack.Screen
        name="HomeMain"
        component={passSignOutProp(HomeMain, signOut)}
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
