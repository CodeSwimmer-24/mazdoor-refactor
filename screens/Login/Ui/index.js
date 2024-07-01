import React from "react";
import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
// import Logo from "../../../assets/logo/logo.png";
import { moderateScale } from "react-native-size-matters";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import styles from "./styles";

const LoginUi = ({ onLoginButtonPress }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <View style={styles.container}>
      {/* <Image source={Logo} style={styles.logo} /> */}

      <TextInput
        value={displayName}
        placeholder="Name"
        onChangeText={(text) => setDisplayName(text)}
      />

      <TextInput
        value={email}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.googleButton}
          onPress={() => onLoginButtonPress(displayName, email)}
        >
          <FontAwesome name="google" size={moderateScale(18)} color="#fff" />
          <Text style={styles.buttonText}>Continue with Google</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomTextContainer}>
        <Text style={styles.bottomText}>Sign in as a Mazdoor Account! </Text>
        <TouchableOpacity
          onPress={() => {
            setIsVisible(true);
          }}
        >
          <Text style={styles.signIn}>SignIn</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginUi;
