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
import { useAuthStore } from "../../../zustand/authStore";
import colors from "../../../constants/colors";
import Header from "./components/Header";
import Banner from "./components/Banner";
import Category from "./components/Category";
import TopRated from "./components/TopRated";

const Home = ({ signOut }) => {
  const { email, role, name, picture, isNewUser } = useAuthStore((state) => ({
    email: state.email,
    role: state.role,
    name: state.name,
    picture: state.picture,
    isNewUser: state.isNewUser,
  }));

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#f9f9f9" />
      <Header name={name} />
      <ScrollView>
        <Banner />
        <Category />
        <TopRated />
      </ScrollView>
      {/* <Button onPress={signOut} title="Logout" /> */}
    </View>
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
