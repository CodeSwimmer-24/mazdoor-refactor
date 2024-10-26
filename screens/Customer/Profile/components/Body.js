import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Linking,
} from "react-native";
import React, { useState } from "react";
import { Feather, Entypo } from "@expo/vector-icons";
import colors from "../../../../constants/colors";
import Account from "../Modals/Account";
import EditProfile from "../Modals/EditProfile";
import Subscription from "../Modals/Subscription";
import ShareApp from "../Modals/ShareApp";
import Footer from "./Footer";
import Notification from "../Modals/Notification/Notification";

const Body = ({
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
  const [notificationsModalVisible, setNotificationsModalVisible] =
    useState(false);
  const [subscriptionModalVisible, setSubscriptionModalVisible] =
    useState(false);
  const [shareAppVisible, setShareAppVisible] = useState(false);
  const [logoutVisible, setLogoutVisible] = useState(false);

  const renderRow = (title, subtitle, icon, stateSetter) => (
    <TouchableOpacity
      onPress={() => {
        if (title === "Your Feedback") {
          Linking.openURL(
            "https://play.google.com/store/apps/details?id=com.mazdoor.digimazdoor&pcampaignid=web_share"
          );
        } else {
          stateSetter(true);
        }
      }}
      style={styles.row}
    >
      <View style={styles.rowLeft}>
        <View style={styles.iconWrapper}>
          <Feather name={icon} size={20} color={colors.primary} />
        </View>
        <View style={styles.textWrapper}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.subtitleText}>{subtitle}</Text>
        </View>
      </View>
      <Entypo name="chevron-right" size={26} color="gray" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {renderRow(
          "My Account",
          "View your account details",
          "user",
          setAccountModalVisible
        )}
        {renderRow(
          "Edit Account",
          "Edit your account details",
          "edit",
          setEditAccountModalVisible
        )}
        {renderRow(
          "Notifications",
          "View your notifications",
          "bell",
          setNotificationsModalVisible
        )}
        {renderRow(
          "Subscription",
          "View Subscription plan",
          "dollar-sign",
          setSubscriptionModalVisible
        )}
        {renderRow(
          "Your Feedback",
          "Share your feedback in playstore.",
          "message-circle",
          () => { } // No state setter needed for opening URL
        )}
        {renderRow(
          "Share",
          "Share this app with your friends.",
          "share-2",
          setShareAppVisible
        )}
        {renderRow(
          "Logout",
          "It you want to logout from this app.",
          "share",
          setLogoutVisible
        )}
      </View>
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
      <ShareApp
        shareAppVisible={shareAppVisible}
        setShareAppVisible={setShareAppVisible}
      />
      <Footer
        logoutVisible={logoutVisible}
        setLogoutVisible={setLogoutVisible}
      />
      <Notification
        notificationsModalVisible={notificationsModalVisible}
        setNotificationsModalVisible={setNotificationsModalVisible}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 40,
  },
  card: {
    width: "90%",
    padding: 16,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 3,
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrapper: {
    marginLeft: 2,
    backgroundColor: "#673de71a",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 50,
  },
  textWrapper: {
    marginLeft: 15,
  },
  titleText: {
    fontSize: 16,
    color: "#505050",
    fontWeight: "400",
  },
  subtitleText: {
    fontSize: 12,
    color: "gray",
    fontWeight: "300",
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  closeText: {
    marginTop: 20,
    color: colors.primary,
  },
});

export default Body;
