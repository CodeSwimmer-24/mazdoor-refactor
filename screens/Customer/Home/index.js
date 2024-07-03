import { useEffect } from "react";
import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  ScrollView,
  StatusBar,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuthStore } from "../../../zustand/authStore";
import { passSignOutProp } from "../../../helpers";
import colors from "../../../constants/colors";
import Header from "./components/Header";
import Banner from "./components/Banner";
import Category from "./components/Category";
import TopRated from "./components/TopRated";
import CategoryDetail from "./components/CategoryDetail";
import ServiceDetail from "./ServiceDetail/ServiceDetail";
import { useIsFocused } from "@react-navigation/native";
import { getTabBarOptions } from "../../../constants/tabBarStyles";

const Stack = createNativeStackNavigator();

const HomeMain = ({ signOut, navigation }) => {
  const { email, role, name, picture, isNewUser, buildingAddress, locality } =
    useAuthStore((state) => ({
      email: state.email,
      role: state.role,
      name: state.name,
      picture: state.picture,
      isNewUser: state.isNewUser,
      buildingAddress: state.buildingAddress,
      locality: state.locality,
    }));

  const isFocused = useIsFocused();
  useEffect(() => {
    const parent = navigation.getParent();
    if (isFocused) {
      parent?.setOptions({
        tabBarStyle: { display: "flex" },
        ...getTabBarOptions(),
      });
    } else {
      parent?.setOptions({
        tabBarStyle: { display: "flex" },
      });
    }
  }, [isFocused, navigation]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#f9f9f9" />
      <Header
        name={name}
        buildingAddress={buildingAddress}
        locality={locality}
      />
      <ScrollView>
        <Banner />
        <Category navigation={navigation} />
        <TopRated />
      </ScrollView>
      {/* <Button onPress={signOut} title="Logout" /> */}
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
