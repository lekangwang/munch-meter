import { palette } from "./Palette";
import { Text, StyleSheet } from "react-native";

export function P({ children }) {
  return <Text style={styles.p}>{children}</Text>;
}

export function H1({ children }) {
  return <Text style={styles.h1}>{children}</Text>;
}

export function H2({ children }) {
  return <Text style={styles.h2}>{children}</Text>;
}

export function H3({ children }) {
  return <Text style={styles.h3}>{children}</Text>;
}

export function H4({ children }) {
  return <Text style={styles.h4}>{children}</Text>;
}

export function H5({ children }) {
  return <Text style={styles.h5}>{children}</Text>;
}

const styles = StyleSheet.create({
  p: {
    fontSize: 15,
    color: palette.text,
  },
  h1: {
    fontSize: 30,
    color: palette.text,
  },
  h2: {
    fontSize: 25,
    color: palette.text,
  },
  h3: {
    fontSize: 20,
    color: palette.text,
  },
  h4: {
    fontSize: 18,
    color: palette.text,
  },
  h5: {
    fontSize: 12,
    color: palette.lightText,
  },
});
