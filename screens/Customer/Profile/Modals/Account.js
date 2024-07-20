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
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import colors from "../../../../constants/colors";
import useProfileImage from "../../../../constants/profileImage";

const Account = ({
  accountModalVisible,
  setAccountModalVisible,
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
  const profileImageUri = useProfileImage();

  console.log(role, "ROLEE");

  const { height } = Dimensions.get("window");
  const modalHeight = role === "mazdoor" ? height * 0.65 : height * 0.55;

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
        <View style={[styles.modalContent, { height: modalHeight }]}>
          <ScrollView>
            <View style={styles.scrollContent}>
              <View style={styles.profileSection}>
                <Image
                  source={{
                    uri: profileImageUri,
                  }}
                  style={styles.profileImage}
                />
                <Text style={styles.profileName}>{name}</Text>
                <Text style={styles.profileEmail}>{email}</Text>
              </View>
              <View style={styles.detailsContainer}>
                <View style={styles.detailBox}>
                  <Ionicons name="call-outline" size={20} color="gray" />
                  <Text style={styles.detailText}>+91 {contact}</Text>
                </View>
                {role === "mazdoor" && (
                  <View style={styles.detailBox2}>
                    <View style={styles.detailRow}>
                      <Ionicons name="people-outline" size={24} color="gray" />
                      <Text style={styles.detailText}>Age {age}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Ionicons
                        name="document-outline"
                        size={20}
                        color="gray"
                      />
                      <Text style={styles.detailText}>
                        Aadhar No {aadharNo}
                      </Text>
                    </View>
                  </View>
                )}
                <View style={styles.detailBox2}>
                  <View style={styles.detailRow}>
                    <Ionicons name="location-outline" size={24} color="gray" />
                    <Text style={styles.detailText}>{buildingAddress}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Ionicons name="map-outline" size={20} color="gray" />
                    <Text style={styles.detailText}>
                      {exactLocation}, {locality} Okhla
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
          <View style={styles.closeButtonContainer}>
            <TouchableOpacity
              onPress={() => setAccountModalVisible(false)}
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
  detailsContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  detailBox: {
    width: "95%",
    backgroundColor: "#f9f9f9",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 7,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
  },
  detailBox2: {
    width: "95%",
    backgroundColor: "#f9f9f9",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 7,
    marginBottom: 20,
  },
  detailText: {
    marginLeft: 5,
    color: "gray",
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
