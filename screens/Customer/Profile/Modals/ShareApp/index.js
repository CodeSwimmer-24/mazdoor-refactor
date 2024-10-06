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
  const playStoreUrl =
    "https://play.google.com/store/apps/details?id=com.mazdoor.digimazdoor&pcampaignid=web_share";

  const shareToWhatsApp = async () => {
    const url = `whatsapp://send?text=${encodeURIComponent(playStoreUrl)}`;
    try {
      Linking.openURL(url);
    } catch (error) {
      console.error("Error sharing on WhatsApp:", error);
    }
  };

  const openInstagram = async () => {
    const url = `https://www.instagram.com/`; // Instagram doesn't provide native sharing like WhatsApp
    const message = `Check out this cool app on Play Store: ${playStoreUrl}`;
    try {
      await Share.share({
        message,
        url: playStoreUrl, // iOS only; ignored in Android
      });
    } catch (error) {
      console.error("Error sharing on Instagram:", error);
    }
  };

  const openTelegram = async () => {
    const url = `https://telegram.me/share/url?url=${encodeURIComponent(playStoreUrl)}`;
    try {
      Linking.openURL(url);
    } catch (error) {
      console.error("Error sharing on Telegram:", error);
    }
  };

  const openX = async () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      `Check out this cool app: ${playStoreUrl}`
    )}`;
    try {
      Linking.openURL(url);
    } catch (error) {
      console.error("Error sharing on X:", error);
    }
  };

  const copyLink = () => {
    Clipboard.setString(playStoreUrl); // Replace with your app's URL
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
                    {playStoreUrl}
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
    backgroundColor: "#f5f5f5",
    width: "100%",
    borderRadius: 10,
    elevation: 1,
    marginBottom: 15
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
