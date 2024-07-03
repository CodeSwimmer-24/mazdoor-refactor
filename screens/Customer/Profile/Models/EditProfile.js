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
import CustomTextInput from "../../../../components/TextInput";
import DropdownTextInput from "../../../../components/DropdownTextInput";

const EditProfile = ({
  editAccountModalVisible,
  setEditAccountModalVisible,
  buildingAddress,
  locality,
  name,
  email,
  contact,
}) => {
  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <Modal
      visible={editAccountModalVisible}
      transparent={true}
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setEditAccountModalVisible(false)}
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
              </View>
            </View>
            <View
              style={{
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: "95%",
                }}
              >
                <CustomTextInput
                  iconName="person-outline"
                  iconType="Ionicons"
                  placeholder="Edit Name"
                  value={name}
                  onChangeText={(text) => handleChange("name", text)}
                />
                <CustomTextInput
                  iconName="call-outline"
                  iconType="Ionicons"
                  placeholder="Edit Contact No."
                  value={contact}
                  onChangeText={(text) => handleChange("contact", text)}
                />
                <CustomTextInput
                  iconName="location-outline"
                  iconType="Ionicons"
                  placeholder="Building Address"
                  value={buildingAddress}
                  onChangeText={(text) => handleChange("buildingAddress", text)}
                />
                <DropdownTextInput
                  iconName="map"
                  iconType="Ionicons"
                  placeholder="Building Address"
                  value={locality}
                  onChangeText={(text) => handleChange("locality", text)}
                />
              </View>
            </View>
          </ScrollView>
          <View style={styles.closeButtonContainer}>
            <TouchableOpacity
              onPress={() => {
                setEditAccountModalVisible(false);
              }}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>SUBMIT</Text>
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
    height: height * 0.7,
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

export default EditProfile;
