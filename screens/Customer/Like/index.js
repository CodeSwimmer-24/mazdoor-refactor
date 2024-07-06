import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useCustomerStore } from "../../../zustand/customerStore";

const Like = () => {
  const { favoriteSps } = useCustomerStore();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" />
      <SafeAreaView>
        {favoriteSps.map(sp => <Text key={sp.favoriteId}>{sp.serviceProvider.title}</Text>)}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
  }
});

export default Like;
