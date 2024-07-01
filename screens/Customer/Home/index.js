import React from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";
import { useAuthStore } from "../../../zustand/authStore";

const Home = ({ signOut }) => {
  const { email, role, name, picture, isNewUser } = useAuthStore((state) => ({
    email: state.email,
    role: state.role,
    name: state.name,
    picture: state.picture,
    isNewUser: state.isNewUser,
  }));

  return (
    <View
      style={{
        marginTop: 50,
      }}
    >
      <View style={styles.container}>
        <Text style={styles.label}>Email: {email}</Text>
        <Text style={styles.label}>Role: {role}</Text>
        <Text style={styles.label}>Name: {name}</Text>

        <Text style={styles.label}>New User: {isNewUser ? "Yes" : "No"}</Text>
      </View>
      <Button onPress={signOut} title="Logout" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
});

export default Home;
