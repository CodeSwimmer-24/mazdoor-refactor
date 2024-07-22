import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import axios from "axios";
import LoginUi from "./Ui";
import RegisterForm from "../Register";
import Customer from "../Customer";
import { hostUrl, getFavoriteSPs } from "../../services";
import { useAuthStore } from "../../zustand/authStore";
import { useCustomerStore } from "../../zustand/customerStore";
import MazdoorRegister from "../Mazdoor/Registration";
import Mazdoor from "../Mazdoor";

const Login = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const authStore = useAuthStore();
  const customerStore = useCustomerStore();

  const { email, startupApisCalled, setStartupApisCalled } = authStore;
  const { favoriteSps, setFavoriteSps } = customerStore;

  const [userRole, setUserRole] = useState("");
  const { role } = useAuthStore();

  useEffect(() => {
    // Simulate initialization
    setInitializing(false);
  }, []);

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
  }, [user, email, favoriteSps.length, startupApisCalled]);

  const onLoginPress = async (email) => {
    setLoading(true);

    try {
      const apiUrl = `${hostUrl}/mazdoor/v1/login`;
      const response = await axios.post(apiUrl, {
        emailId: email,
        role: userRole,
        name: "", // Adjust as needed
      });

      if (response.status === 200) {
        const responseData = response.data;
        authStore.setEmail(email);
        authStore.setRole(userRole);
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
      console.error("Failed to authenticate user.", error);
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
    return (
      <LoginUi
        onLoginPress={onLoginPress}
        setUserRole={setUserRole}
        userRole={userRole}
      />
    );
  } else if (authStore.isNewUser) {
    return !role ? (
      userRole === "customer" ? (
        <RegisterForm />
      ) : (
        <MazdoorRegister />
      )
    ) : role === "customer" ? (
      <RegisterForm />
    ) : (
      <MazdoorRegister />
    );
  } else {
    return !role ? (
      userRole === "customer" ? (
        <Customer />
      ) : (
        <Mazdoor />
      )
    ) : role === "customer" ? (
      <Customer />
    ) : (
      <Mazdoor />
    );
  }
};

export default Login;
