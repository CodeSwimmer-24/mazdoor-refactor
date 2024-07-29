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
    width: "80%",
    marginTop: moderateScale(50),
  },
  googleButton: {
    width: "100%",
    backgroundColor: colors.baseColor,
    paddingVertical: moderateScale(12),
    elevation: 5,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: moderateScale(14),
    marginLeft: moderateScale(12),
  },
  bottomTextContainer: {
    position: "absolute",
    bottom: moderateScale(25),
    alignItems: "center",
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  bottomText: {
    fontSize: moderateScale(12),
    color: "gray",
    fontWeight: "200",
    alignItems: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  signIn: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primary,
  },
});

export default styles;
