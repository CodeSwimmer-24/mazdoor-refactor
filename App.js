import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Login from "./screens/Login";
import colors from "./constants/colors";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" backgroundColor="transparen" />
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
