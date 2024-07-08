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
import colors from "../../../../constants/colors";

const LikeModal = ({ setIsVisible, isVisible, favId, data }) => {
  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setIsVisible(false)}
        />
        <View style={styles.modalContent}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.profileSection}>
              <Image
                style={styles.profileImage}
                source={{
                  uri: "https://www.pngall.com/wp-content/uploads/8/Worker-PNG-HD-Image.png",
                }}
              />
              <Text style={styles.profileName}>{data.name}</Text>
              <Text style={styles.profileEmail}>{data.email}</Text>
            </View>
          </ScrollView>
          <View style={styles.closeButtonContainer}>
            <TouchableOpacity
              style={[
                styles.closeButton,
                {
                  backgroundColor: colors.dangerBackground,
                },
              ]}
            >
              <Text
                style={[
                  styles.closeButtonText,
                  {
                    color: colors.danger,
                    fontWeight: "600",
                  },
                ]}
              >
                Remove
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.closeButton,
                {
                  elevation: 5,
                },
              ]}
            >
              <Text style={styles.closeButtonText}>View More</Text>
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
    height: height * 0.35,
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
    elevation: 1,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  detailText: {
    marginLeft: 5,
    color: "gray",
  },
  closeButtonContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  closeButton: {
    backgroundColor: colors.primary,
    width: "48%",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 10,
  },
  closeButtonText: {
    fontSize: 16,
    color: "white",
  },
});

export default LikeModal;
