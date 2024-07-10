import React from "react";
import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
// import Logo from "../../../assets/logo/logo.png";
import { moderateScale } from "react-native-size-matters";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import styles from "./styles";

const LoginUi = ({ onGoogleButtonPress }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* <Image source={Logo} style={styles.logo} /> */}

      {/* <TextInput
        value={displayName}
        placeholder="Name"
        onChangeText={(text) => setDisplayName(text)}
      /> */}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.googleButton}
          onPress={onGoogleButtonPress}
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
