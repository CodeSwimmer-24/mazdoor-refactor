import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AllBanners from "../Modal/AllBanners";

const { width } = Dimensions.get("window");

const images = [
  "https://previews.123rf.com/images/mcandy/mcandy1609/mcandy160900031/64232823-big-sale-banner-with-bright-ink-blue-color-blots-over-white-background-each-element-separate-on.jpg",
  "https://image.shutterstock.com/image-vector/super-sale-badge-discount-banner-260nw-1503109874.jpg",
  "https://www.shutterstock.com/image-vector/summer-sale-template-banner-vector-260nw-656471581.jpg",
];

const Banner = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollViewRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % images.length;
      setCurrentIndex(nextIndex);
      scrollViewRef.current.scrollTo({
        x: width * nextIndex * 0.9,
        animated: true,
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, images.length]);

  return (
    <View style={styles.bannerContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Promotions</Text>
        <TouchableOpacity
          onPress={() => {
            console.log("ssss");
            setIsVisible(true);
          }}
          style={styles.seeMoreButton}
        >
          <Text style={styles.seeMoreText}>See All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.floor(
            event.nativeEvent.contentOffset.x / (width * 0.9)
          );
          setCurrentIndex(newIndex);
        }}
      >
        {images.map((image, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.image} />
          </View>
        ))}
      </ScrollView>
      <AllBanners isVisible={isVisible} setIsVisible={setIsVisible} />
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    marginTop: hp("2%"),
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: wp("90%"),
    marginBottom: hp("1.0%"),
    marginTop: hp("-0.625%"),
  },
  imageContainer: {
    paddingLeft: 20,
    width: width * 0.9,
    padding: wp("2.5%"),
  },
  image: {
    width: "100%",
    height: hp("20%"),
    resizeMode: "cover",
    borderRadius: 10,
  },
  headerTitle: {
    fontSize: hp("2%"),
    fontWeight: "600",
    color: "#505050",
  },
  seeMoreButton: {
    backgroundColor: "#673de71a",
    paddingVertical: hp("0.625%"),
    paddingHorizontal: wp("2.5%"),
    borderRadius: 50,
  },
  seeMoreText: {
    fontSize: hp("1.5%"),
    fontWeight: "600",
    color: "#673de7",
  },
});

export default Banner;
