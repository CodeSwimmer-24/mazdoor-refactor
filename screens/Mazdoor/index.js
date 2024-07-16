import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons"; // or any other icon library you prefer
import { getTabBarOptions } from "../../constants/tabBarStyles";
import Booking from "./Booking/index";
import Profile from "../Customer/Profile";
import Shop from "./Shop";
import MazdoorHome from "./Home/screens";

const Tab = createBottomTabNavigator();

const Mazdoor = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Booking") {
              iconName = focused ? "calendar" : "calendar-outline";
            } else if (route.name === "Shop") {
              iconName = focused ? "storefront" : "storefront-outline";
            } else if (route.name === "Profile") {
              iconName = focused ? "person" : "person-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          ...getTabBarOptions(),
        })}
      >
        <Tab.Screen
          name="Home"
          options={{ headerShown: false }}
          component={MazdoorHome}
        />
        <Tab.Screen
          name="Booking"
          options={{ headerShown: false }}
          component={Booking}
        />
        <Tab.Screen
          name="Shop"
          options={{ headerShown: false }}
          component={Shop}
        />
        <Tab.Screen
          name="Profile"
          options={{ headerShown: false }}
          component={Profile}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Mazdoor;
