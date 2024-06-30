import { View, ActivityIndicator } from "react-native";
// import { GoogleSignin } from "@react-native-google-signin/google-signin";
// import auth from "@react-native-firebase/auth";
import React, { useEffect, useState } from "react";
import LoginUi from "./Ui";
import { hostUrl } from "../../services";
import RegisterForm from "../Register";
import Home from "../Customer";
import { useAuthStore } from "../../zustand/authStore";

const Login = () => {
  const [initializing, setInitializing] = useState(false);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false); // State to manage loading indicator
  const authStore = useAuthStore(); // Initialize Zustand store

  // GoogleSignin.configure({
  //   webClientId:
  //     "1089802403669-9gvlsn8sejkuvo5m0217l9uoscefkajc.apps.googleusercontent.com",
  // });

  // const onGoogleButtonPress = async () => {
  //   setLoading(true); // Set loading to true when starting login process
  //   await GoogleSignin.hasPlayServices({
  //     showPlayServicesUpdateDialog: true,
  //   });
  //   const { idToken } = await GoogleSignin.signIn();
  //   const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  //   try {
  //     const result = await auth().signInWithCredential(googleCredential);
  //     const { displayName, email } = result.user;

  //     const apiUrl = `${hostUrl}/mazdoor/v1/login`;

  //     const response = await fetch(apiUrl, {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         emailId: email,
  //         role: "customer",
  //         name: displayName,
  //       }),
  //     });

  //     if (response.ok) {
  //       const responseData = await response.json();
  //       console.log("User logged in successfully!", responseData);
  //       setUser(result.user);

  //       // Update Zustand store with email, role, and name
  //       authStore.setEmail(email);
  //       authStore.setRole("customer");
  //       authStore.setName(displayName);
  //       authStore.setPicture(result.additionalUserInfo.profile.picture);
  //       authStore.setIsNewUser(responseData.isNewUser); // Set isNewUser from API response

  //       // Persist state in AsyncStorage
  //       // authStore.persistState();
  //     } else {
  //       console.error(
  //         "Failed to log in user via API. Server responded with:",
  //         response.status,
  //         response.statusText
  //       );
  //       const errorData = await response.json();
  //       console.error("Error details:", errorData);
  //     }
  //   } catch (error) {
  //     console.error("Failed to authenticate user with Firebase.", error);
  //   } finally {
  //     setLoading(false); // Set loading to false when login process completes (success or failure)
  //   }
  // };

  const signIn = async (displayName, email) => {
    setLoading(true);

    const apiUrl = `${hostUrl}/mazdoor/v1/login`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emailId: email,
        role: "customer",
        name: displayName,
      }),
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log("User logged in successfully!", responseData);
      // setting true for now to bypass
      setUser(true);

      // Update Zustand store with email, role, and name
      authStore.setEmail(email);
      authStore.setRole("customer");
      authStore.setName(displayName);
      // authStore.setPicture(result.additionalUserInfo.profile.picture);
      authStore.setIsNewUser(responseData.isNewUser); // Set isNewUser from API response

      // Persist state in AsyncStorage
      // authStore.persistState();
    } else {
      console.error(
        "Failed to log in user via API. Server responded with:",
        response.status,
        response.statusText
      );
      const errorData = await response.json();
      console.error("Error details:", errorData);
    }

    setLoading(false); // Set loading to false when login process completes (success or failure)
  };

  const signOut = async () => {
    try {
      // await GoogleSignin.revokeAccess();
      // await auth().signOut();
      setUser(null);

      // Reset Zustand store on sign out
      authStore.setEmail("");
      authStore.setRole("");
      authStore.setName("");
      authStore.setPicture("");
      authStore.setIsNewUser(false); // Reset isNewUser on sign out

      // Clear persisted state from AsyncStorage
      // await AsyncStorage.removeItem("@authStore");
    } catch (error) {
      console.error("Failed to sign out user.", error);
    }
  };

  // function onAuthStateChanged(user) {
  //   setUser(user);
  //   if (initializing) setInitializing(false);
  // }

  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber; // Cleanup subscription
  // }, []);

  if (initializing) return null;

  if (!user) {
    return loading ? (
      <View
        style={{
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View>
          <ActivityIndicator size={50} color="#0000ff" />
        </View>
      </View>
    ) : (
      // <LoginUi onGoogleButtonPress={onGoogleButtonPress} />
      <LoginUi onLoginButtonPress={signIn} />
    );
  }

  // Example conditional rendering based on isNewUser state
  if (authStore.isNewUser) {
    return <RegisterForm signOut={signOut} />;
  } else {
    return <Home signOut={signOut} />;
  }
};

export default Login;
