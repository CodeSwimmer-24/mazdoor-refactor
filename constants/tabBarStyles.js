import { Dimensions } from "react-native";
import colors from "./colors";
import { moderateScale } from "react-native-size-matters";

const { width } = Dimensions.get("window");

export const getTabBarOptions = () => ({
  tabBarActiveTintColor: colors.primary,
  tabBarInactiveTintColor: colors.tabColor,
  tabBarShowLabel: false,
  tabBarStyle: {
    height: moderateScale(55, 0.5),
    position: "absolute",
    bottom: moderateScale(10, 0.5),
    left: width * 0.05,
    width: width * 0.9,
    borderRadius: moderateScale(12, 0.5),
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: moderateScale(2, 0.5) },
    shadowOpacity: 0.25,
    shadowRadius: moderateScale(3.84, 0.5),
    elevation: 5,
    borderTopWidth: 1,
    borderTopColor: "transparent",
  },
});
