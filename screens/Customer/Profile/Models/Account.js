import {
  View,
  Text,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import React from "react";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../../../../constants/colors";

const Account = ({
  accountModalVisible,
  setAccountModalVisible,
  buildingAddress,
  locality,
  name,
  email,
  contact,
}) => {
  return (
    <Modal
      visible={accountModalVisible}
      transparent={true}
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setAccountModalVisible(false)}
        />
        <View style={styles.modalContent}>
          <ScrollView>
            <View style={styles.scrollContent}>
              <View style={styles.profileSection}>
                <Image
                  source={{
                    uri: "https://pixelmator.com/community/download/file.php?avatar=20501_1694070821.jpg",
                  }}
                  style={styles.profileImage}
                />
                <Text style={styles.profileName}>{name}</Text>
                <Text style={styles.profileEmail}>{email}</Text>
              </View>
              <View style={styles.detailsSection}>
                <View style={styles.detailRow}>
                  <MaterialCommunityIcons
                    name="phone"
                    size={24}
                    color="#673de78a"
                  />
                  <Text style={styles.detailText}>+91 {contact}</Text>
                </View>
                <View style={styles.detailRow}>
                  <MaterialCommunityIcons
                    name="office-building"
                    size={24}
                    color="#673de78a"
                  />
                  <Text style={styles.detailText}>{buildingAddress}</Text>
                </View>
                <View style={styles.detailRow}>
                  <MaterialCommunityIcons
                    name="map"
                    size={24}
                    color="#673de78a"
                  />
                  <Text style={styles.detailText}>{locality}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Entypo name="location" size={24} color="#673de78a" />
                  <Text style={styles.detailText}>Token No 6</Text>
                </View>
              </View>
            </View>
          </ScrollView>
          <View style={styles.closeButtonContainer}>
            <TouchableOpacity
              onPress={() => {
                setAccountModalVisible(false);
              }}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
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
    height: height * 0.55,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    overflow: "hidden",
    borderTopWidth: 0.5,
    borderTopColor: "lightgray",
  },
  scrollContent: {
    paddingBottom: 20,
  },
  profileSection: {
    alignItems: "center",
    marginTop: 20,
  },
  profileImage: {
    height: 80,
    width: 80,
    borderRadius: 50,
  },
  profileName: {
    marginTop: 10,
    fontSize: 20,
    color: "#505050",
  },
  profileEmail: {
    fontSize: 12,
    color: "gray",
    fontWeight: "300",
  },
  detailsSection: {
    marginTop: 30,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  detailText: {
    paddingLeft: 5,
    fontSize: 14,
    color: "#505050",
  },
  closeButtonContainer: {
    alignItems: "center",
    padding: 10,
  },
  closeButton: {
    backgroundColor: colors.primary,
    width: "95%",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 10,
    elevation: 5,
  },
  closeButtonText: {
    fontSize: 16,
    color: "white",
  },
});

export default Account;
