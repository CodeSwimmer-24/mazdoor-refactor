import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { moderateScale } from "react-native-size-matters";
import Logo from "../../../assets/assets/logo.png";
import styles from "./styles";
import colors from "../../../constants/colors";

const LoginUi = ({ onGoogleButtonPress, setUserRole, userRole }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleGoogleButtonPress = (role) => {
    onGoogleButtonPress();
    setUserRole(role);
  };

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.googleButton}
          onPress={() => handleGoogleButtonPress("customer")}
        >
          <FontAwesome name="google" size={moderateScale(18)} color="#fff" />
          <Text style={styles.buttonText}>SignIn with User Account</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.buttonContainer, { marginTop: 25 }]}>
        <TouchableOpacity
          style={[styles.googleButton, { backgroundColor: "white" }]}
          onPress={() => handleGoogleButtonPress("mazdoor")}
        >
          <FontAwesome
            name="google"
            size={moderateScale(18)}
            color={colors.baseColor}
          />
          <Text style={[styles.buttonText, { color: colors.baseColor }]}>
            SignIn with Mazdoor Account
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginUi;
