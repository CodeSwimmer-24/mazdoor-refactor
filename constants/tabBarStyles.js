import { Dimensions } from "react-native";
import colors from "./colors";

const { width } = Dimensions.get("window");

export const getTabBarOptions = () => ({
  tabBarActiveTintColor: colors.primary,
  tabBarInactiveTintColor: colors.tabColor,
  tabBarShowLabel: false,
  tabBarStyle: {
    height: 60,
    position: "absolute",
    bottom: 10,
    left: width * 0.05,
    width: width * 0.9,
    borderRadius: 12,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderTopWidth: 1,
    borderTopColor: "gray",
    borderTopColor: "transparent",
  },
});
