import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../../../constants/colors";
import Card from "./Cards/Card";

const sampleData = [
  {
    id: "1",
    name: "Babban Kalal",
    age: 32,
    gender: "Male",
    profession: "Plumber",
    shopName: "Babban Shop",
    date: "26 June - 8:30",
    location: "Shahenn Bagh, Delhi",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR63UM1yuQLSHbj-UHMge8_fMzzanCg2nK45A&s",
  },
  {
    id: "2",
    name: "Aman Singh",
    age: 28,
    gender: "Male",
    profession: "Electrician",
    shopName: "Aman Electricals",
    date: "27 June - 10:00",
    location: "Connaught Place, Delhi",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdfQAgXeqwFhf_6n8-9zQ_mZBZ8CNBso1u7g&s",
  },
  {
    id: "2",
    name: "Aman Singh",
    age: 28,
    gender: "Male",
    profession: "Electrician",
    shopName: "Aman Electricals",
    date: "27 June - 10:00",
    location: "Connaught Place, Delhi",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdfQAgXeqwFhf_6n8-9zQ_mZBZ8CNBso1u7g&s",
  },
];

const Booking = () => {
  return (
    <>
      <View style={styles.header}>
        <Entypo name="chevron-left" size={24} color="white" />
        <Text style={styles.headerText}>Service Booking</Text>
        <MaterialCommunityIcons name="menu-open" size={24} color="white" />
      </View>
      <ScrollView style={styles.scrollView}>
        {sampleData.map((item) => (
          <Card
            key={item.id}
            name={item.name}
            age={item.age}
            gender={item.gender}
            profession={item.profession}
            shopName={item.shopName}
            date={item.date}
            location={item.location}
            imageUrl={item.imageUrl}
          />
        ))}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 140,
    backgroundColor: colors.baseColor,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 0, // Adjusted marginTop to 0
    paddingVertical: 0, // Adjusted paddingVertical to 0
    zIndex: 0, // Set zIndex to 0 for the header
  },
  headerText: {
    fontSize: 22,
    color: colors.white,
    fontWeight: "600",
  },
  scrollView: {
    backgroundColor: "white",
    paddingTop: 10, // Ensure the ScrollView starts below the header
    zIndex: 100, // Set zIndex to 100 for the scrollable content
  },
});

export default Booking;
