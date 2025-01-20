import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Linking,
  Share,
} from "react-native";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Entypo,
} from "@expo/vector-icons";
import colors from "../../../../constants/colors";
import Account from "../Modals/Account";
import EditProfile from "../Modals/EditProfile";
import Subscription from "../Modals/Subscription";
import Footer from "./Footer";
import axios from "axios";
import { hostUrl } from "../../../../services";
import { useAuthStore } from "../../../../zustand/authStore";

const Profile = ({
  navigation,
  buildingAddress,
  locality,
  name,
  email,
  contact,
  exactLocation,
  age,
  role,
  aadharNo,
}) => {
  const [accountModalVisible, setAccountModalVisible] = useState(false);
  const [editAccountModalVisible, setEditAccountModalVisible] = useState(false);
  const [appData, setAppData] = useState(null);
  const [notificationsModalVisible, setNotificationsModalVisible] =
    useState(false);
  const [subscriptionModalVisible, setSubscriptionModalVisible] =
    useState(false);
  const [logoutVisible, setLogoutVisible] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state added

  const [whatsAppNumber, setWhatsAppNumber] = useState(null);
  const [youtubeVideo, setYoutubeVideo] = useState("");

  useEffect(() => {
    const fetchAppData = async () => {
      try {
        const response = await axios.get(`${hostUrl}/mazdoor/v1/getAppData`);
        const data = response.data;

        if (data.length > 0) {
          if (data[0].whatsAppNumber) {
            console.log("WhatsApp Number:", data[0].whatsAppNumber);
            setWhatsAppNumber(data[0].whatsAppNumber);
          }

          if (data[0].youtubeVideoLink) {
            console.log("YouTube Video Link:", data[0].youtubeVideoLink);
            setYoutubeVideo(data[0].youtubeVideoLink);
          }
        }
      } catch (error) {
        console.error("Error fetching app data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppData();
  }, []);
  const openURL = (url) => {
    if (url && url.trim() !== "") {
      Linking.openURL(url);
    } else {
      console.warn("Invalid URL: cannot be empty");
    }
  };
  // Share App Functionality
  const shareApp = async () => {
    try {
      await Share.share({
        message:
          "Check out DigiMazdoor App: https://play.google.com/store/apps/details?id=com.mazdoor.digimazdoor",
      });
    } catch (error) {
      console.error("Error sharing the app:", error);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        {/* Feature's Setting Section */}
        <View>
          <SectionHeader title="Feature's Setting" />
          {renderSettingOption(
            "View Your Account",
            "view-dashboard-outline",
            MaterialCommunityIcons,
            () => setAccountModalVisible(true),
            role
          )}
          {renderSettingOption(
            "Edit Profile Details",
            "circle-edit-outline",
            MaterialCommunityIcons,
            () => setEditAccountModalVisible(true),
            role
          )}
        </View>

        {/* Support and Subscription Section */}
        <View style={{ marginTop: 20 }}>
          <SectionHeader title="Support and Subscription" />
          {renderSettingOption(
            "Subscribe & Unlock all feature's",
            "currency-rupee",
            MaterialIcons,
            role === "mazdoor" ? () => setSubscriptionModalVisible(true) : null,
            role
          )}
          {role === "mazdoor" &&
            renderSettingOption(
              "Youtube Demo Video",
              "youtube",
              MaterialCommunityIcons,
              () => openURL(youtubeVideo),
              role
            )}
          {renderSettingOption(
            "Feedback & Reports",
            "message-alert-outline",
            MaterialCommunityIcons,
            () =>
              openURL(
                "https://play.google.com/store/apps/details?id=com.mazdoor.digimazdoor"
              ),
            role
          )}
          {renderSettingOption(
            "Rate us on Playstore",
            "star-outline",
            MaterialIcons,
            () =>
              openURL(
                "https://play.google.com/store/apps/details?id=com.mazdoor.digimazdoor"
              ),
            role
          )}
          {renderSettingOption(
            "Share DigiMazdoor App",
            "share-all-outline",
            MaterialCommunityIcons,
            shareApp
          )}
        </View>

        {/* Contact Section */}
        <View style={{ marginTop: 20 }}>
          <SectionHeader title="Contact" />
          {renderSettingOption("About Us", "info-outline", MaterialIcons, () =>
            openURL("https://mazdoor-website.pages.dev/")
          )}
          {renderSettingOption(
            "WhatsApp",
            "whatsapp",
            MaterialCommunityIcons,
            () => openURL(`https://wa.me/+91 ${whatsAppNumber}`)
          )}
          {renderSettingOption(
            "Instagram",
            "instagram",
            MaterialCommunityIcons,
            () => openURL("https://www.instagram.com/digimazdoor.tech/")
          )}
        </View>

        {/* Terms and Conditions Section */}
        <View style={{ marginTop: 40 }}>
          <SectionHeader title="Terms Conditions & Policy" />
          {renderSettingOption(
            "Terms & Conditions",
            "newspaper-variant-multiple",
            MaterialCommunityIcons,
            () => openURL("https://mazdoor-website.pages.dev/term&condition")
          )}
          {renderSettingOption(
            "Privacy Policy",
            "security",
            MaterialCommunityIcons,
            () => openURL("https://mazdoor-website.pages.dev/policy")
          )}
        </View>

        {/* Logout Section */}
        <View style={{ marginTop: 0, marginBottom: 50 }}>
          <SectionHeader />
          {renderSettingOption("Logout", "logout", MaterialIcons, () =>
            setLogoutVisible(true)
          )}
        </View>
      </ScrollView>

      {/* Modals */}
      <Account
        accountModalVisible={accountModalVisible}
        setAccountModalVisible={setAccountModalVisible}
        buildingAddress={buildingAddress}
        locality={locality}
        name={name}
        email={email}
        contact={contact}
        exactLocation={exactLocation}
        age={age}
        role={role}
        aadharNo={aadharNo}
      />
      <EditProfile
        editAccountModalVisible={editAccountModalVisible}
        setEditAccountModalVisible={setEditAccountModalVisible}
        buildingAddress={buildingAddress}
        locality={locality}
        exactLocation={exactLocation}
        name={name}
        email={email}
        contact={contact}
        age={age}
        role={role}
        aadharNo={aadharNo}
      />
      <Subscription
        subscriptionModalVisible={subscriptionModalVisible}
        setSubscriptionModalVisible={setSubscriptionModalVisible}
        name={name}
        email={email}
        role={role}
      />
      <Footer
        logoutVisible={logoutVisible}
        setLogoutVisible={setLogoutVisible}
      />
    </SafeAreaView>
  );
};

// Section Header Component
const SectionHeader = ({ title }) => (
  <View style={{ paddingHorizontal: 20, marginBottom: 5 }}>
    <Text style={{ color: colors.gray, fontSize: 13, marginBottom: 5 }}>
      {title}
    </Text>
    <View style={{ height: 0.7, backgroundColor: "lightgray" }} />
  </View>
);

// Render Setting Option Component
const renderSettingOption = (label, iconName, IconComponent, onPress, role) => (
  <TouchableOpacity style={styles.optionContainer} onPress={onPress}>
    <View style={styles.optionContent}>
      <IconComponent name={iconName} size={22} color="#696969" />
      <Text
        style={[
          styles.optionText,
          label === "Subscribe & Unlock all feature's" && role === "customer" && { textDecorationLine: 'line-through' }
        ]}
      >
        {label}
      </Text>
    </View>
    <Entypo name="chevron-right" size={22} color="#383838" />
  </TouchableOpacity>


);

const styles = {
  optionContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderBottomColor: "#e0e0e0",
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionText: {
    paddingLeft: 10,
    fontSize: 15,
    color: "#383838",
  },
};

export default Profile;
