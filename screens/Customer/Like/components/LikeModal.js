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
import { deleteFavoriteSp, getFavoriteSPs } from "../../../../services";

const LikeModal = ({
  setIsVisible,
  isVisible,
  email,
  favId,
  setFavoriteSps,
  data,
  navigation,
}) => {
  const removeFromFavorite = () => {
    deleteFavoriteSp(email, favId).then(() => {
      getFavoriteSPs(email).then((data) => {
        setFavoriteSps(data);
        setIsVisible(false);
      });
    });
  };

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
                  uri: "https://img.freepik.com/free-photo/close-up-man-wearing-protection-helmet_23-2148921427.jpg",
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
              onPress={removeFromFavorite}
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
              onPress={() =>
                navigation.navigate("ServiceDetail", {
                  emailId: data.email,
                })
              }
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
    height: height * 0.4,
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
