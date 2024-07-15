import {
  View,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Text,
  Image,
} from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import colors from "../../../../../constants/colors";

const AllBanners = ({ isVisible, setIsVisible }) => {
  const { height } = Dimensions.get("window");
  const modalHeight = height * 0.65;

  const offerList = [
    "https://img.freepik.com/free-vector/asbtract-colorful-sales-background_23-2148388643.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1721001600&semt=ais_user",
    "https://www.shutterstock.com/image-vector/weekend-sale-special-offer-banner-260nw-794599204.jpg",
    "https://static.vecteezy.com/system/resources/thumbnails/002/038/675/small_2x/flash-sale-discount-banner-promotion-background-vector.jpg",
  ];

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setIsVisible(false)}
        />
        <View style={[styles.modalContent, { height: modalHeight }]}>
          <ScrollView>
            <View style={styles.scrollContent}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingTop: 10,
                  paddingHorizontal: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: "#505050",
                  }}
                >
                  List of pramotions
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setIsVisible(false);
                  }}
                  style={{
                    backgroundColor: colors.dangerBackground,
                    padding: 5,
                    borderRadius: 50,
                  }}
                >
                  <Entypo name="cross" size={20} color={colors.danger} />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                alignItems: "center",
              }}
            >
              {offerList.map((list, index) => {
                return (
                  <Image
                    key={index}
                    source={{
                      uri: list,
                    }}
                    style={{
                      width: "100%",
                      height: 180,
                      borderRadius: 10,
                      objectFit: "cover",
                      marginTop: 20,
                    }}
                  />
                );
              })}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    overflow: "hidden",
    borderTopWidth: 0.5,
    borderTopColor: "lightgray",
  },
  scrollContent: {
    paddingBottom: 20,
  },
});

export default AllBanners;
