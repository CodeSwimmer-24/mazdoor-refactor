import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Login from "./screens/Login";
import 'expo-dev-client';
import { getLocations } from "./services";
import { useSystemStore } from "./zustand/systemStore";

export default function App() {
  const { setLocations } = useSystemStore();

  useEffect(() => {
    getLocations()
      .then(data => setLocations(data))
      .catch(err => console.error("Error fetching district data:", err));
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" backgroundColor="transparent" />
      <Login />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
