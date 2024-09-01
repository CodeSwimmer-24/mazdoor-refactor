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
  ToastAndroid,
  Share,
  Clipboard,
  Linking
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import colors from "../../../../../constants/colors";

const ShareApp = ({ shareAppVisible, setShareAppVisible }) => {
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
    Linking.openURL("https://www.instagram.com/").catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  const openTelegram = () => {
    Linking.openURL("https://facebook.com/").catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  const openX = () => {
    Linking.openURL("https://x.com/").catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  const copyLink = () => {
    Clipboard.setString("https://your-app-url.com"); // Replace with your app's URL
    ToastAndroid.show("Link copied to clipboard!", ToastAndroid.SHORT); // Android only
  };

  return (
    <Modal visible={shareAppVisible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setShareAppVisible(false)}
        />
        <View style={styles.modalContent}>
          <ScrollView>
            <View>
              <View style={styles.header}>
                <Text style={styles.headerText}>Share Application</Text>
                <TouchableOpacity
                  onPress={() => setShareAppVisible(false)}
                  style={styles.closeButton}
                >
                  <Entypo name="cross" size={20} color={colors.danger} />
                </TouchableOpacity>
              </View>
              <View style={styles.iconContainer}>
                <TouchableOpacity
                  onPress={shareToWhatsApp}
                  style={styles.iconWrapper}
                >
                  <Image
                    source={require("../../../../../assets/assets/whatsapp.png")}
                    style={styles.icon}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={openInstagram}
                  style={styles.iconWrapper}
                >
                  <Image
                    source={require("../../../../../assets/assets/instagram.png")}
                    style={styles.icon}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={openTelegram}
                  style={styles.iconWrapper}
                >
                  <Image
                    source={require("../../../../../assets/assets/facebook.png")}
                    style={styles.icon}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={openX} style={styles.iconWrapper}>
                  <Image
                    source={require("../../../../../assets/assets/x.png")}
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.copyLinkContainer}>
              <TouchableOpacity
                onPress={copyLink}
                style={styles.copyLinkButton}
              >
                <View style={styles.copyLinkContent}>
                  <Entypo name="link" size={24} color={colors.primary} />
                  <Text style={styles.copyLinkText}>
                    https://play.google.com/store/apps/details?id=com.fahad999.mazdoorapp&pcampaignid=web_share
                  </Text>
                </View>
              </TouchableOpacity>
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
    height: height * 0.35,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
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
});

export default ShareApp;
