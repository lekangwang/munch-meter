import { StyleSheet, View } from "react-native";
import { palette } from "./Palette";

export default function Wrapper({ children }) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: palette.background,
    borderColor: palette.greyText,
    borderWidth: 2,
    width: "100%",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
});
