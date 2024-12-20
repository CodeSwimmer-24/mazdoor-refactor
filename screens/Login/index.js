import React, { useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

import LoginUi from "./Ui";
import RegisterForm from "../Register";
import Customer from "../Customer";

import { hostUrl, getFavoriteSPs } from "../../services";
import { useAuthStore } from "../../zustand/authStore";
import { useCustomerStore } from "../../zustand/customerStore";
import MazdoorRegister from "../Mazdoor/Registration";
import Mazdoor from "../Mazdoor";
import InvalidUser from "../../global/InValidUser";

const Login = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false); // State to manage loading indicator
  const authStore = useAuthStore(); // Initialize Zustand store
  const customerStore = useCustomerStore();

  const { email, startupApisCalled, setStartupApisCalled } = authStore;
  const { favoriteSps, setFavoriteSps } = customerStore;

  const [showModal, setShowModal] = useState(false);

  const { role } = useAuthStore();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      setUser(user);
      if (initializing) setInitializing(false);
    });

    return subscriber; // unsubscribe on unmount
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
    GoogleSignin.revokeAccess();
    auth().signOut();

    authStore.reset();
  };

  useEffect(() => {
    if (user && email) {
      if (!favoriteSps.length && !startupApisCalled) {
        getFavoriteSPs(email)
          .then((sps) => {
            setFavoriteSps(sps);
            setStartupApisCalled(true);
          })
          .catch((err) => console.log(err.response.data));
      }
    }
  }, [user, email]);

  GoogleSignin.configure({
    webClientId:
      "659599005965-4fl00tl7ouiea7rgmn888ice2g8m63b3.apps.googleusercontent.com",
  });

  const onGoogleButtonPress = async (role) => {
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
        role: role,
        name: displayName,
      });

      if (response.status === 200) {
        const responseData = response.data;
        authStore.setIsValidUser(responseData.isValidUser);
        if (responseData.isValidUser === false) {
          setShowModal(true);
        }
        authStore.setName(displayName);
        authStore.setEmail(email);
        authStore.setRole(role);
        authStore.setPicture(result.additionalUserInfo.profile.picture);
        authStore.setIsNewUser(responseData.isNewUser);
        if (!responseData.isNewUser) {
          const profileApiUrl = `${hostUrl}/mazdoor/v1/getProfile?emailId=${email}`;
          const profileResponse = await axios.get(profileApiUrl);

          if (profileResponse.status === 200) {
            const profileData = profileResponse.data;

            authStore.setName(profileData.name);
            authStore.setContact(profileData.contactNo);
            authStore.setBuildingAddress(profileData.address.buildingAddress);
            authStore.setGender(profileData.gender);
            authStore.setAge(profileData.age);
            authStore.setRole(profileData.role);
            authStore.setAadharNo(profileData.aadharNo);
            authStore.setLocality(profileData.address.locality);
            authStore.setExactLocation(profileData.address.exactLocation);
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
      setLoading(false);
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
  } else if (authStore.isValidUser === false) {
    return (
      <InvalidUser showModal={showModal} handleCloseModal={handleCloseModal} />
    );
  } else if (authStore.isNewUser) {
    return role === "customer" ? <RegisterForm /> : <MazdoorRegister />;
  } else {
    return role === "customer" ? <Customer /> : <Mazdoor />;
  }
};

export default Login;
