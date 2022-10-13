import { useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { palette } from "./util/Palette";
import { H1, P } from "./util/Typography";
import axios from "axios";
import * as EmailValidator from "email-validator";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Error Handling TODO
  const [showEmailError, setShowEmailError] = useState(false); // REDUX
  const [showEmptyFieldError, setShowEmptyFieldError] = useState(false); // REDUX

  const loginVerificationHandler = async () => {
    // Check that email is in correct format
    if (EmailValidator.validate(email)) {
      console.log(`Email: ${email}, Password: ${password}`);
      const res = await axios.post("", { email, password });
      if (loginSuccess) {
        // Login is successful
      } else {
        // Something is wrong, check the response for more info
      }
    } else {
      setShowEmailError(true); // REDUX
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <H1>Login</H1>
        <View>
          <TextInput
            placeholder="Email"
            onChangeText={(em) => setEmail(em)}
            value={email}
          />
        </View>
        <View>
          <TextInput
            placeholder="Password"
            onChangeText={(pw) => setPassword(pw)}
            value={
              showPassword
                ? password
                : password
                    .split("")
                    .map((c) => "*")
                    .join("")
            }
          />
          <Button
            onPress={() => {
              setShowPassword((currState) => !currState);
            }}
            title="View Password"
            color="#841584"
            accessibilityLabel="button to unhide password"
          />
        </View>
        <View>
          <Button
            onPress={loginVerificationHandler}
            title="Sign In"
            color="#841584"
            accessibilityLabel="sign in button"
          />
        </View>
        <View>
          <View>
            <P>Don't have an account? Register now</P>
            <Button
              onPress={toggleShowPasswordHandler}
              title="Register"
              color="#841584"
              accessibilityLabel="register for an account button"
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background,
    justifyContent: "center",
  },
});
