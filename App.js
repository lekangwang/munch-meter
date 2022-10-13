import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { H1 } from "./screens/util/Typography";

export default function App() {
  return (
    <View style={styles.container}>
      <H1>munch meter</H1>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
