import { View, Text, Button } from "react-native";
import React from "react";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useAuthStore } from "../../../zustand/authStore";

const Mazdoor = () => {
  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await auth().signOut();
      // setUser(null);

      useAuthStore.reset();
    } catch (error) {
      console.error("Failed to sign out user.", error);
    }
  };

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
      }}
    >
      <Text>Mazdoor</Text>
      <Button title="Logout" onPress={signOut} />
    </View>
  );
};

export default Mazdoor;
