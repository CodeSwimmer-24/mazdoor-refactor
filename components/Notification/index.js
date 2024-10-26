import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
  PanResponder,
  StatusBar,
} from "react-native";
import colors from "../../constants/colors";
import { Entypo } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");
const statusBarHeight = StatusBar.currentHeight || 0;

const Notification = ({ isVisible, setIsVisible }) => {
  const [drawerWidth] = useState(width * 0.85);
  const [drawerHeight] = useState(height * 1.5);

  const translateX = useRef(new Animated.Value(-drawerWidth)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dx) > 20,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx < 0) {
          translateX.setValue(gestureState.dx);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < -50) {
          closeDrawer();
        } else {
          openDrawer();
        }
      },
    })
  ).current;

  useEffect(() => {
    if (isVisible) {
      openDrawer();
    } else {
      closeDrawer();
    }
  }, [isVisible]);

  const openDrawer = () => {
    Animated.timing(translateX, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeDrawer = () => {
    Animated.timing(translateX, {
      toValue: -drawerWidth,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setIsVisible(false));
  };

  return (
    <View style={styles.overlayContainer}>
      {isVisible && (
        <View style={styles.overlay}>
          <TouchableOpacity style={styles.overlay} onPress={closeDrawer} />
        </View>
      )}
      <Animated.View
        style={[
          styles.drawer,
          {
            width: drawerWidth,
            height: drawerHeight,
            transform: [{ translateX }],
            marginTop: statusBarHeight,
          },
        ]}
        {...panResponder.panHandlers}
      >
        <View style={styles.drawerHeader}>
          <Text style={styles.drawerTitle}>Your Notification's</Text>
          <TouchableOpacity onPress={closeDrawer}>
            <Entypo name="cross" size={24} color={colors.danger} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <View style={styles.notificationContainer}>
            <Text
              style={{
                fontSize: 16,
                color: colors.primary,
              }}
            >
              Welcome to Digimazdoor
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: "gray",
                paddingVertical: 5,
              }}
            >
              Thanks for been a part of this application.
            </Text>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  drawer: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "white",
    elevation: 5,
    zIndex: 101,
    borderTopRightRadius: 10,
  },
  drawerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    // borderBottomWidth: 1,
    // borderBottomColor: "lightgray",
  },
  drawerTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.baseColor,
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
    color: "#505050",
  },
  notificationContainer: {
    width: "90%",
    backgroundColor: colors.white,
    elevation: 5,
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
});

export default Notification;
