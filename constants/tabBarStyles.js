import { Dimensions } from "react-native";
import colors from "./colors";
import { moderateScale } from "react-native-size-matters";

export const getTabBarOptions = () => ({
  tabBarActiveTintColor: colors.primary,
  tabBarInactiveTintColor: colors.tabColor,
  tabBarShowLabel: true,
  tabBarLabelStyle: {
    fontSize: moderateScale(10), // Adjust the font size
    fontWeight: "300",
    paddingBottom: 10,
  },
  tabBarStyle: {
    position: "absolute",
    backgroundColor: "#fff",
    borderTopWidth: moderateScale(0.1),
    height: moderateScale(70),
    shadowColor: "#000",
    shadowOpacity: 0.1,
    // shadowOffset: { width: 0, height: moderateScale(-2) },
    shadowRadius: moderateScale(10),
    elevation: 5,
    borderTopLeftRadius: moderateScale(0),
    borderTopRightRadius: moderateScale(0),
  },
});
