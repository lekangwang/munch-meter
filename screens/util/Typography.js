import { palette } from "./Palette";
import { Text, StyleSheet } from "react-native";

export function P({ children, style }) {
  return (
    <Text
      style={style instanceof Array ? [styles.p, ...style] : [styles.p, style]}
    >
      {children}
    </Text>
  );
}

export function H1({ children, style }) {
  return (
    <Text
      style={
        style instanceof Array ? [styles.h1, ...style] : [styles.h1, style]
      }
    >
      {children}
    </Text>
  );
}

export function H2({ children, style }) {
  return (
    <Text
      style={
        style instanceof Array ? [styles.h2, ...style] : [styles.h2, style]
      }
    ></Text>
  );
}

export function H3({ children, style }) {
  return (
    <Text
      style={
        style instanceof Array ? [styles.h3, ...style] : [styles.h3, style]
      }
    >
      {children}
    </Text>
  );
}

export function H4({ children, style }) {
  return (
    <Text
      style={
        style instanceof Array ? [styles.h4, ...style] : [styles.h4, style]
      }
    >
      {children}
    </Text>
  );
}

export function H5({ children, style }) {
  return (
    <Text
      style={
        style instanceof Array ? [styles.h5, ...style] : [styles.h5, style]
      }
    >
      {children}
    </Text>
  );
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
