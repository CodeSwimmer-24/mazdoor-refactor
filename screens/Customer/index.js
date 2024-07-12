import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons"; // or any other icon library you prefer
import Home from "../Customer/Home";
import Booking from "./Booking";
import Like from "./Like";
import Profile from "./Profile";
import { getTabBarOptions } from "../../constants/tabBarStyles";

const Tab = createBottomTabNavigator();

const Customer = () => {
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
            } else if (route.name === "Like") {
              iconName = focused ? "bookmark" : "bookmark-outline";
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
          component={Home}
        />
        <Tab.Screen
          name="Booking"
          options={{ headerShown: false }}
          component={Booking}
        />
        <Tab.Screen
          name="Like"
          options={{ headerShown: false }}
          component={Like}
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

export default Customer;
