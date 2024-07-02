import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Octicons } from "@expo/vector-icons";
import colors from "../../../../constants/colors";

const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.profileContainer}>
          <Image
            source={{
              uri: "https://pixelmator.com/community/download/file.php?avatar=20501_1694070821.jpg",
            }}
            style={styles.profileImage}
          />
          <View style={styles.textContainer}>
            <Text style={styles.nameText}>Fahad Mahmood</Text>
            <Text style={styles.emailText}>fahadmamood1200@gmail.com</Text>
            <Text style={styles.emailText}>+91 7272977850</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Octicons name="pencil" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 40,
  },
  innerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    width: "90%",
    backgroundColor: colors.baseColor,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 15,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    height: 60,
    width: 60,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: colors.white,
  },
  textContainer: {
    marginLeft: 10,
  },
  nameText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
  },
  emailText: {
    fontSize: 10,
    fontWeight: "300",
    color: "lightgray",
  },
});

export default Header;
