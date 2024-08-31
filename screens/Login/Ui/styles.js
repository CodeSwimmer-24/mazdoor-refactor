import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";
import colors from "../../../constants/colors";

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    height: "100%",
    width: "100%",
  },
  logo: {
    height: moderateScale(100),
    width: "100%",
    marginLeft: moderateScale(40),
    resizeMode: "cover",
  },
  buttonContainer: {
    justifyContent: "center",
    width: "85%",
    marginTop: moderateScale(10),
  },
  googleButton: {
    width: "100%",
    backgroundColor: colors.baseColor,
    paddingVertical: moderateScale(15),
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.baseColor,
  },
  mazdoorButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: colors.baseColor,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: moderateScale(14),
    marginLeft: moderateScale(12),
    fontWeight: "400",
  },
  mazdoorButtonText: {
    color: colors.baseColor,
  },
  bottomTextContainer: {
    position: "absolute",
    bottom: moderateScale(20),
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
  },
  policyTextContainer: {
    width: "85%",
    marginTop: moderateScale(35),
  },
  policyText: {
    fontSize: 12,
    color: "gray",
  },
  policyLink: {
    textDecorationLine: "underline",
    fontSize: 13,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    height: "92%",
    backgroundColor: colors.white,
    borderRadius: 5,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.baseColor,
  },
  modalText: {
    fontSize: 14,
    color: "gray",
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 5,
  },
  closeButtonText: {
    color: colors.white,
    fontWeight: "600",
  },
});

export default styles;
