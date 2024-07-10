import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import axios from "axios";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

import LoginUi from "./Ui";
import RegisterForm from "../Register";
import Customer from "../Customer";

import { hostUrl, getFavoriteSPs } from "../../services";
import { useAuthStore } from "../../zustand/authStore";
import { useCustomerStore } from "../../zustand/customerStore";

const Login = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false); // State to manage loading indicator
  const authStore = useAuthStore(); // Initialize Zustand store
  const customerStore = useCustomerStore();

  const { email, startupApisCalled, setStartupApisCalled } = authStore;
  const { favoriteSps, setFavoriteSps } = customerStore;

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      setUser(user);
      if (initializing) setInitializing(false);
    });

    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    if (user && email) {
      if (!favoriteSps.length && !startupApisCalled) {
        console.log("Getting Favorite Shops");

        getFavoriteSPs(email)
          .then((sps) => {
            console.log("Setting the Favorite Shops");
            setFavoriteSps(sps);
            setStartupApisCalled(true);
          })
          .catch((err) => console.log(err.response.data));
      }
    }
  }, [user, email]);

  GoogleSignin.configure({
    webClientId: "1061751220739-t2ti12p4u36or9f10qjgk14jrhlt4csn.apps.googleusercontent.com"
  });

  const onGoogleButtonPress = async () => {
    setLoading(true); // Set loading to true when starting login process

    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    try {
      const result = await auth().signInWithCredential(googleCredential);
      const { displayName, email } = result.user;

      const apiUrl = `${hostUrl}/mazdoor/v1/login`;

      const response = await axios.post(apiUrl, {
        emailId: email,
        role: "customer",
        name: displayName,
      });

      if (response.status === 200) {
        const responseData = response.data;
        console.log("User logged in successfully!", responseData);

        // Update Zustand store with email, role, and name
        authStore.setName(displayName);
        authStore.setEmail(email);
        authStore.setRole("customer");
        authStore.setPicture(result.additionalUserInfo.profile.picture);
        authStore.setIsNewUser(responseData.isNewUser); // Set isNewUser from API response

        if (!responseData.isNewUser) {
          const profileApiUrl = `${hostUrl}/mazdoor/v1/getProfile?emailId=${email}`;
          const profileResponse = await axios.get(profileApiUrl);

          if (profileResponse.status === 200) {
            const profileData = profileResponse.data;
            console.log("User profile fetched successfully!");

            authStore.setName(profileData.name);
            authStore.setContact(profileData.contactNo);
            authStore.setBuildingAddress(profileData.address.buildingAddress);
            authStore.setLocality(profileData.address.locality);
          } else {
            console.error(
              "Failed to fetch user profile via API. Server responded with:",
              profileResponse.status,
              profileResponse.statusText
            );
            const errorData = await profileResponse.json();
            console.error("Error details:", errorData);
          }
        }

        setUser(true);

      } else {
        console.error(
          "Failed to log in user via API. Server responded with:",
          response.status,
          response.statusText
        );
        const errorData = response.data;
        console.error("Error details:", errorData);
      }
    } catch (error) {
      console.error("Failed to authenticate user with Firebase.", error);
    } finally {
      setLoading(false); // Set loading to false when login process completes (success or failure)
    }
  };

  if (loading || initializing) {
    return (
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
    );
  } else if (!user) {
    return <LoginUi onGoogleButtonPress={onGoogleButtonPress} />;
  } else if (authStore.isNewUser) {
    return <RegisterForm />;
  } else {
    return <Customer />;
  }
};

export default Login;
