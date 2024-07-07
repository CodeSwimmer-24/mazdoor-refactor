import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons, Entypo, FontAwesome5 } from "@expo/vector-icons";
import colors from "../../../../constants/colors";

const Card = ({
  key,
  name,
  age,
  gender,
  profession,
  shopName,
  date,
  location,
  status,
}) => {
  const getStatusColor = () => {
    switch (status.toLowerCase()) {
      case "pending":
        return styles.statusInProgress;
      case "confirm":
        return styles.statusCompleted;
      case "progress":
        return styles.statusInProgress;
      case "cancelled":
        return styles.statusCanclled;
      default:
        return styles.statusDefault;
    }
  };

  return (
    <View key={key} style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.iconContainer}>
              <MaterialIcons
                name="electric-bolt"
                size={20}
                color="#4782da"
                style={styles.icon}
              />
            </View>
            <View style={styles.headerTitle}>
              <Text style={styles.headerText}>{name}</Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <View style={styles.roleContainer}>
              <Text style={styles.roleText}>{profession}</Text>
            </View>
          </View>
        </View>
        <View style={styles.body}>
          <View style={styles.bodyLeft}>
            <Image
              source={{
                uri: "https://img.freepik.com/free-photo/close-up-man-wearing-protection-helmet_23-2148921427.jpg",
              }}
              style={styles.profileImage}
            />
            <View style={styles.bodyTextContainer}>
              <Text style={styles.bodyTitle}>{shopName}</Text>
              <Text style={styles.bodySubtitle}>{location}</Text>
              <Text style={styles.bodySubtitle}>{date}</Text>
            </View>
          </View>
          <View style={styles.bodyRight}>
            <TouchableOpacity>
              <MaterialIcons
                name="call"
                size={24}
                color={colors.primary}
                style={styles.callIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesome5
                name="whatsapp"
                size={24}
                color="#075e54"
                style={styles.whatsappIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.footerLeft}>
            <Text style={[styles.statusText, getStatusColor()]}>
              {status.toUpperCase()}
            </Text>
          </TouchableOpacity>
          {status.toLowerCase() === "completed" ? (
            <TouchableOpacity
              style={[
                styles.footerRight,
                {
                  backgroundColor: "#4782da1a",
                },
              ]}
            >
              <Entypo name="star" size={16} color="#4782da" />
              <Text
                style={[
                  styles.cancelText,
                  {
                    color: "#4782da",
                  },
                ]}
              >
                Feedback
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.footerRight}>
              <Entypo name="cross" size={16} color={colors.danger} />
              <Text style={styles.cancelText}>CANCEL</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  card: {
    width: "90%",
    backgroundColor: "white",
    elevation: 5,
    borderRadius: 6,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    backgroundColor: "#4782da2a",
    width: 28,
    height: 30,
    marginTop: -10,
    borderBottomRightRadius: 20,
  },
  icon: {
    padding: 2,
  },
  headerTitle: {
    paddingTop: 0,
    paddingLeft: 30,
  },
  headerText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#505050",
  },
  headerRight: {
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  roleContainer: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 50,
  },
  roleText: {
    fontWeight: "600",
    fontSize: 12,
    color: colors.primary,
  },
  body: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  bodyLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    height: 35,
    width: 35,
    borderRadius: 50,
  },
  bodyTextContainer: {
    marginLeft: 12,
  },
  bodyTitle: {
    fontWeight: "600",
    fontSize: 16,
  },
  bodySubtitle: {
    fontSize: 12,
    marginTop: 2,
    color: "gray",
  },
  bodyRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  callIcon: {
    marginRight: 20,
  },
  whatsappIcon: {
    marginRight: 5,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  footerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusText: {
    fontSize: 14,
    fontWeight: "600",
  },
  statusInProgress: {
    color: "orange",
  },
  statusCompleted: {
    color: "green",
  },
  statusDefault: {
    color: "gray",
  },
  statusCanclled: {
    color: colors.danger,
  },
  footerRight: {
    backgroundColor: colors.dangerBackground,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 3,
    flexDirection: "row",
    alignItems: "center",
  },
  cancelText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.danger,
    marginLeft: 5,
  },
});

export default Card;
