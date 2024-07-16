import React from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
} from "react-native";

import gpay from "../../../../../assets/assets/gpay.png";
import phonepay from "../../../../../assets/assets/phonepay.png";
import paytm from "../../../../../assets/assets/paytm.png";
import paypal from "../../../../../assets/assets/paypal.webp";

const Upi = ({ upiPopup, setUpiPopup, payWithGooglePay, payWithPhonePe }) => {
  return (
    <Modal
      visible={upiPopup}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setUpiPopup(false)}
    >
      <View style={styles.modalContainer}>
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setUpiPopup(false)}
        />
        <View style={styles.modalContent}>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={payWithGooglePay}>
              <Image source={gpay} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={payWithPhonePe}>
              <Image source={phonepay} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={paytm} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={paypal} style={styles.icon} />
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
    height: height * 0.18,
    backgroundColor: "white",
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    padding: 10,
    overflow: "hidden",
    borderTopWidth: 0.5,
    borderTopColor: "lightgray",
    width: "100%",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
    paddingVertical: 20,
    width: "100%",
    marginBottom: 20,
  },
  icon: {
    height: 80,
    width: 60,
    resizeMode: "contain",
  },
});

export default Upi;
