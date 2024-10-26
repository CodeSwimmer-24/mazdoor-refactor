import React from "react";
import {
  View,
  Text,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  Clipboard,
  ToastAndroid,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Linking } from "react-native";
import colors from "../../../../../constants/colors";

const Notification = ({
  notificationsModalVisible,
  setNotificationsModalVisible,
}) => {
  const shareToWhatsApp = async () => {
    try {
      await Share.share({
        message: "Check out this cool app!",
        url: "https://your-app-url.com",
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const openInstagram = () => {
    Linking.openURL("https://www.instagram.com/");
  };

  const openTelegram = () => {
    Linking.openURL("https://facebook.com/");
  };

  const x = () => {
    Linking.openURL("https://x.com/");
  };

  const copyLink = () => {
    Clipboard.setString("https://your-app-url.com"); // Replace with your app's URL
    ToastAndroid.show("Link copied to clipboard!", ToastAndroid.SHORT); // Android only
  };

  return (
    <Modal
      visible={notificationsModalVisible}
      transparent={true}
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setNotificationsModalVisible(false)}
        />
        <View style={styles.modalContent}>
          <ScrollView>
            <View>
              <View style={styles.header}>
                <Text style={styles.headerText}>Your Notifications</Text>
                <TouchableOpacity
                  onPress={() => setNotificationsModalVisible(false)}
                  style={styles.closeButton}
                >
                  <Entypo name="cross" size={20} color={colors.danger} />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <View style={styles.notificationContainer}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: colors.primary,
                    }}
                  >
                    Welcome to Digimazdoor
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "gray",
                      paddingVertical: 5,
                    }}
                  >
                    Thanks for been a part of this application.
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    height: height * 0.85,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    overflow: "hidden",
    borderTopWidth: 0.5,
    borderTopColor: "lightgray",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 20,
    color: "#505050",
  },
  closeButton: {
    backgroundColor: colors.dangerBackground,
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 50,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  iconWrapper: {
    alignItems: "center",
  },
  icon: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  copyLinkContainer: {
    alignItems: "center",
    marginTop: 40,
  },
  copyLinkButton: {
    backgroundColor: "#f8f8f8",
    width: "90%",
    borderRadius: 50,
  },
  copyLinkContent: {
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  copyLinkText: {
    marginLeft: 10,
    fontSize: 13,
    color: "gray",
  },
  notificationContainer: {
    width: "95%",
    backgroundColor: colors.white,
    elevation: 5,
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
});

export default Notification;
