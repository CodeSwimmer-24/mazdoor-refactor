import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons"; // or any other icon library you prefer
import { Dimensions } from "react-native";
import Home from "../Customer/Home";
import { passSignOutProp } from "../../helpers";
import Booking from "./Booking";
import Like from "./Like";
import Profile from "./Profile";
import colors from "../../constants/colors";

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get("window");

const Customer = ({ signOut }) => {
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
              iconName = focused ? "heart" : "heart-outline";
            } else if (route.name === "Profile") {
              iconName = focused ? "person" : "person-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.tabColor,
          tabBarShowLabel: false, // Hide the tab labels
          tabBarStyle: {
            height: 60, // Increase the height of the tab bar
            position: "absolute",
            bottom: 10, // Adjust the bottom position if needed
            left: width * 0.05, // Center horizontally
            width: width * 0.9, // 90% of screen width
            borderRadius: 12, // Optional: add border radius for a rounded effect
            backgroundColor: "white", // Optional: background color
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5, // Optional: for Android shadow effect
            // borderTopWidth: 1, // Remove top border
            borderTopColor: "gray",
            borderTopColor: "transparent", // Ensure the top border is transparent
          },
        })}
      >
        <Tab.Screen
          name="Home"
          options={{ headerShown: false }}
          component={passSignOutProp(Home, signOut)}
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
