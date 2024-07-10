import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Login from "./screens/Login";
import 'expo-dev-client';

export default function App() {
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
