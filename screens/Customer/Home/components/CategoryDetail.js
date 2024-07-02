import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const CategoryDetail = ({ route, navigation }) => {
    const { label } = route.params;

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#f9f9f9" />
            <SafeAreaView>
                <Text>Category Details</Text>
                <Text>{label}</Text>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: "100%"
    }
});

export default CategoryDetail;
