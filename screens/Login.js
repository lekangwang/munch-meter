import { useState } from "react";
import { StyleSheet, View, TextInput, Button } from "react-native";
import { palette } from "./util/Palette";
import { H1, P } from "./util/Typography";
import * as EmailValidator from "email-validator";
import axios from "axios";
import { env } from "../env";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Error Handling TODO
  const [showEmailError, setShowEmailError] = useState(false); // REDUX
  const [showEmptyFieldError, setShowEmptyFieldError] = useState(false); // REDUX

  const loginVerificationHandler = () => {
    // Check that email is in correct format
    if (EmailValidator.validate(email)) {
      console.log(
        `Email: ${email}, Password: ${password}, ${env.FLASK_BASE_URL}`
      );
      axios
        .post(`${env.FLASK_BASE_URL}/login`, {
          email: "123@sesamestreet.ca",
          password: "password",
        })
        .then((res) => {
          console.log(res.data.data.message);
        })
        .catch((err) => {
          console.log("fat bunda styll");
          console.log(err.response);
          console.log("another fat bunda");
        });

      // axios
      //   .get(`http://10.0.2.2:5000/login`)
      //   .then((res) => console.log(res))
      //   .catch((err) => console.log(err));

      // if (res.status == 200) {
      //   console.log("Login successful");
      //   // Login is successful
      // } else {
      //   // Something is wrong, check the response for more info
      //   console.log("Login failed");
      // }
    } else {
      console.log("bad");
      setShowEmailError(true); // REDUX
    }
  };

  function logout() {
    axios
      .get(`${env.FLASK_BASE_URL}/logout`)
      .then((res) => {
        console.log(res.data.data.message);
      })
      .catch((err) => {
        console.log("fat bunda styll");
        console.log(err.response);
        console.log("another fat bunda");
      });
  }

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
              // showPassword
              //   ? password
              //   : password
              //       .split("")
              //       .map((c) => "*")
              //       .join("")
              password
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
          <Button
            onPress={logout}
            title="Logout"
            color="#841584"
            accessibilityLabel="logout button"
          />
        </View>
        <View>
          <View>
            <P>Don't have an account? Register now</P>
            <Button
              onPress={() => console.log("register")}
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
