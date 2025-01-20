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
    height: "94%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
  },
  scrollViewContent: {
    padding: 30,
  },
  picture: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    padding: 10,
  },
  selectedPicture: {
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderRadius: 10,
  },
  pictureImage: {
    height: moderateScale(60),
    width: moderateScale(60),
    borderRadius: 30,
  },
  genderText: {
    fontSize: moderateScale(12),
    color: "#505050",
    marginTop: 5,
  },
  headerContainer: {
    marginBottom: 15,
    alignItems: "center",
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
    textAlign: "center",
  },
  googleButton: {
    width: "100%",
    backgroundColor: colors.primary,
    paddingVertical: moderateScale(15),
    elevation: 5,
    borderRadius: 2,
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
  roleToggleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },
  roleButton: {
    width: "48%",
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 2,
    paddingVertical: moderateScale(10),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    flexDirection: "row",
  },
  selectedRoleButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  roleText: {
    marginLeft: 8,
    fontSize: moderateScale(12),
    color: colors.primary,
    fontWeight: "400",
  },
  selectedRoleText: {
    color: "white",
  },
  genderSelectionContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 15,
  },
});

export default styles;
