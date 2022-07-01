import { StyleSheet, Text } from "react-native";
import { COLOR_P, COLOR_H } from "../../assets/colors.js";
import { useFonts } from "expo-font";

export function P(props) {
  let BASE_FONT = "PTSans";
  const [fontsLoaded] = useFonts({
    PTSans: require("../../assets/fonts/PTSans-Regular.ttf"),
  });

  if (!fontsLoaded) {
    BASE_FONT = "";
  }
  return (
    <Text
      {...props.props}
      style={[styles.p, props.style, { fontFamily: BASE_FONT }]}
    >
      {props.children}
    </Text>
  );
}

export function H1(props) {
  return (
    <P props={props} style={styles.h1}>
      {props.children}
    </P>
  );
}

export function H2(props) {
  return (
    <P props={props} style={styles.h2}>
      {props.children}
    </P>
  );
}

export function H3(props) {
  return (
    <P props={props} style={styles.h3}>
      {props.children}
    </P>
  );
}

export function H4(props) {
  return (
    <P props={props} style={styles.h4}>
      {props.children}
    </P>
  );
}

const styles = StyleSheet.create({
  h1: {
    fontSize: 24,
    color: COLOR_H,
  },
  h2: {
    fontSize: 22,
    color: COLOR_H,
  },
  h3: {
    fontSize: 20,
    color: COLOR_H,
  },
  h4: {
    fontSize: 18,
    color: COLOR_H,
  },
  p: {
    fontSize: 16,
    color: COLOR_P,
  },
});
