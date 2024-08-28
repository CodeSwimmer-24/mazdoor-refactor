import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { moderateScale } from "react-native-size-matters";
import Logo from "../../../assets/assets/logo.png";
import styles from "./styles";
import colors from "../../../constants/colors";
import policy from "../../../constants/policy";
import { useAuthStore } from "../../../zustand/authStore";

const LoginUi = ({ onGoogleButtonPress, setUserRole, userRole }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { setRole } = useAuthStore();

  const handleGoogleButtonPress = (role) => {
    onGoogleButtonPress();
    setUserRole(role);
    setRole(role);
  };

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} />

      {isVisible ? (
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
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.googleButton}
            onPress={() => handleGoogleButtonPress("customer")}
          >
            <FontAwesome name="google" size={moderateScale(18)} color="#fff" />
            <Text style={styles.buttonText}>SignIn with Customer Account</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={{ marginTop: 15 }}>
        {isVisible === false ? (
          <View style={styles.bottomText}>
            <Text style={{ color: "gray" }}>
              If you are a Worker, please do!{" "}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setIsVisible(!isVisible);
              }}
            >
              <Text style={styles.signIn}>Mazdoor SignUp</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.bottomText}>
            <Text style={{ color: "gray" }}>SignIn as customer! </Text>
            <TouchableOpacity
              onPress={() => {
                setIsVisible(!isVisible);
              }}
            >
              <Text style={styles.signIn}>Customer SignUp</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.bottomTextContainer}>
        <View>
          <Text style={{ color: "gray", alignItems: "center" }}>
            Please check our policy{" "}
          </Text>
        </View>
        <TouchableOpacity>
          <Text
            style={{
              fontWeight: "600",
              color: colors.primary,
            }}
            onPress={() => setIsModalVisible(true)}
          >
            Terms and Conditions
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <ScrollView>
              <Text style={styles.modalTitle}>Terms and Conditions</Text>
              <Text style={styles.modalText}>{policy.policy}</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LoginUi;
