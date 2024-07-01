import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../Customer/Home";
import Booking from "./Booking";
import Like from "./Like";
import Profile from "./Profile";

// Higher order component, to pass in the props to a component
const passProp = (Component, signOut) => {
  return () => <Component signOut={signOut} />;
};

const Tab = createBottomTabNavigator();

const Customer = ({ signOut }) => {
  return <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="Home" component={passProp(Home, signOut)} />
      <Tab.Screen name="Booking" component={Booking} />
      <Tab.Screen name="Like" component={Like} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  </NavigationContainer>;
};

export default Customer;
