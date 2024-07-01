import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";
import colors from "../../constants/colors";

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: colors.primary,
  },
  modalContent: {
    backgroundColor: "white",
    width: "100%",
    height: "90%",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    overflow: "hidden",
  },
  scrollViewContent: {
    padding: 30,
  },
  picture: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  pictureImage: {
    height: 80,
    width: 80,
    borderRadius: 50,
    elevation: 5,
  },
  headerContainer: {
    marginBottom: 0,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "600",
    color: colors.baseColor,
  },
  subHeaderText: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: "300",
    color: "gray",
  },
  googleButton: {
    width: "100%",
    backgroundColor: colors.primary,
    paddingVertical: moderateScale(12),
    elevation: 5,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: moderateScale(14),
  },
});

export default styles;
