import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import React, { useState } from "react";
import { Feather, Entypo } from "@expo/vector-icons";
import colors from "../../../../constants/colors";
import Account from "../Models/Account";
import EditProfile from "../Models/EditProfile";

const Body = ({ buildingAddress, locality, name, email, contact }) => {
  const [accountModalVisible, setAccountModalVisible] = useState(false);
  const [editAccountModalVisible, setEditAccountModalVisible] = useState(false);
  const [notificationsModalVisible, setNotificationsModalVisible] =
    useState(false);
  const [subscriptionModalVisible, setSubscriptionModalVisible] =
    useState(false);
  const [technicalSupportModalVisible, setTechnicalSupportModalVisible] =
    useState(false);

  const renderRow = (title, subtitle, icon, stateSetter) => (
    <TouchableOpacity onPress={() => stateSetter(true)} style={styles.row}>
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
          "Technical Support",
          "We are here to help you out",
          "headphones",
          setTechnicalSupportModalVisible
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
      />
      <EditProfile
        editAccountModalVisible={editAccountModalVisible}
        setEditAccountModalVisible={setEditAccountModalVisible}
        buildingAddress={buildingAddress}
        locality={locality}
        name={name}
        email={email}
        contact={contact}
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
    elevation: 5,
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
