import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  ImageBackground,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Logo from "../../../assets/assets/logo.png";
import styles from "./styles";
import { useAuthStore } from "../../../zustand/authStore";
import { moderateScale } from "react-native-size-matters";
import colors from "../../../constants/colors";
import bg from "../../../assets/Post/bg.png"; // Ensure the path is correct

const LoginUi = ({ onGoogleButtonPress }) => {
  const { setRole } = useAuthStore();

  const handleGoogleButtonPress = (role) => {
    onGoogleButtonPress(role);
    setRole(role);
  };

  const openLink = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  return (
    <ImageBackground source={bg} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Image source={Logo} style={styles.logo} />
        <View style={styles.bottomTextContainer}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.googleButton}
              onPress={() => handleGoogleButtonPress("customer")}
            >
              <FontAwesome name="google" size={moderateScale(18)} color="#fff" />
              <Text style={styles.buttonText}>SignIn with User Account</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.googleButton, styles.mazdoorButton]}
              onPress={() => handleGoogleButtonPress("mazdoor")}
            >
              <FontAwesome
                name="google"
                size={moderateScale(18)}
                color={colors.primary}
              />
              <Text style={[styles.buttonText, styles.mazdoorButtonText]}>
                SignIn with Mazdoor Account
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.policyTextContainer}>
            <Text style={styles.policyText}>
              By continuing, you agree that you have read and accept our{" "}
              <Text
                onPress={() =>
                  openLink("https://mazdoor-website.pages.dev/term&condition")
                }
                style={styles.policyLink}
              >
                T&Cs
              </Text>
              and{" "}
              <Text
                onPress={() =>
                  openLink("https://mazdoor-website.pages.dev/Privacypolicy")
                }
                style={styles.policyLink}
              >
                Privacy Policy
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default LoginUi;
