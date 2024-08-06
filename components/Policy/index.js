import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import colors from "../../constants/colors"; // Adjust this import according to your project structure

const Policy = ({ policyVisible, setPolicyVisible }) => {
  return (
    <Modal visible={policyVisible} transparent={true} animationType="slide">
      <TouchableWithoutFeedback onPress={() => setPolicyVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* Modal content */}
            <View style={styles.modalContent}>
              <ScrollView>
                <View style={styles.header}>
                  <Text style={styles.title}>Terms and Conditions</Text>
                  <TouchableOpacity
                    onPress={() => setPolicyVisible(false)}
                    style={styles.closeButton}
                  >
                    <Entypo name="cross" size={20} color={colors.danger} />
                  </TouchableOpacity>
                </View>

                <Text style={styles.message}>
                  After you've completed your request for access to production,
                  we'll review your submission. When the review is complete,
                  we'll email the account owner with an update. This usually
                  takes 7 days or less, but may occasionally take longer. If
                  your app isn't ready to be published, you may be required to
                  continue testing your app. Examples include not having 20
                  testers opted-in to your closed test or your testers not being
                  engaged with your app during your closed test. If your
                  application is successful, you can access Production (Release
                  Production) and make your app available to billions of users
                  on Google Play when you think it's ready. You can also use
                  Open testing (Release Testing Open testing). We recommend
                  testing your app extensively before publishing it to
                  production and routinely testing any future updates you make.
                  After you've completed your request for access to production,
                  we'll review your submission. When the review is complete,
                  we'll email the account owner with an update. This usually
                  takes 7 days or less, but may occasionally take longer. If
                  your app isn't ready to be published, you may be required to
                  continue testing your app. Examples include not having 20
                  testers opted-in to your closed test or your testers not being
                  engaged with your app during your closed test. If your
                  application is successful, you can access Production (Release
                  Production) and make your app available to billions of users
                  on Google Play when you think it's ready. You can also use
                  Open testing (Release Testing Open testing). We recommend
                  testing your app extensively before publishing it to
                  production and routinely testing any future updates you make.
                </Text>
              </ScrollView>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: colors.white,
    borderRadius: 5,
    overflow: "hidden",
  },
  modalContent: {
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 19,
    color: "#505050",
  },
  closeButton: {
    backgroundColor: colors.dangerBackground,
    padding: 5,
    borderRadius: 50,
  },
  message: {
    color: "gray",
    fontSize: 12,
    lineHeight: 20,
  },
});

export default Policy;
