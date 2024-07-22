import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { moderateScale } from "react-native-size-matters";
import Logo from "../../../assets/assets/logo.png";
import styles from "./styles";
import colors from "../../../constants/colors";

const LoginUi = ({ onLoginPress, setUserRole, userRole }) => {
  const [email, setEmail] = useState("");

  const handleLoginPress = (role) => {
    setUserRole(role);
    onLoginPress(email);
  };

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => handleLoginPress("customer")}
        >
          <Text style={styles.buttonText}>Login as Customer</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.buttonContainer, { marginTop: 25 }]}>
        <TouchableOpacity
          style={[styles.loginButton, { backgroundColor: colors.baseColor }]}
          onPress={() => handleLoginPress("mazdoor")}
        >
          <Text style={[styles.buttonText, { color: "white" }]}>
            Login as Mazdoor
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginUi;
