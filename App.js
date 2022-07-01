import { StyleSheet, View, StatusBar } from "react-native";
import Entry from "./screens/registration/Entry";
import { COLOR_BASE } from "./assets/colors";

export default function App() {
  return (
    <View style={styles.body}>
      <Entry />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    width: "100%",
    height: "100%",
    backgroundColor: COLOR_BASE,
  },
});
