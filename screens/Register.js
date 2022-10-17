import { useState } from "react";
import { StyleSheet, View, TextInput, Button } from "react-native";
import { palette } from "./util/Palette";
import { H1, P } from "./util/Typography";
import axios from "axios";
import * as EmailValidator from "email-validator";
import { env } from "../env";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [calories, setCalories] = useState(0);
  const [proteins, setProteins] = useState(0);
  const [fats, setFats] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");

  // Error Handling TODO
  const [showEmailError, setShowEmailError] = useState(false); // REDUX
  const [showCountryError, setShowCountryError] = useState(false); // REDUX
  const [showCalorieError, setShowCalorieError] = useState(false); // REDUX
  const [showProteinError, setShowProteinError] = useState(false); // REDUX
  const [showFatsError, setShowFatsError] = useState(false); // REDUX
  const [showCarbError, setShowCarbError] = useState(false); // REDUX
  const [showEmptyFieldError, setShowEmptyFieldError] = useState(false); // REDUX

  const createAccountHandler = async () => {
    const res = await axios
      .post(`${env.FLASK_BASE_URL}/register`, {
        email,
        password,
        country,
        city,
        calories,
        proteins,
        fats,
        carbs,
      })
      .then((res) => console.log(res.data))
      .catch((err) => {
        console.log("big facts");
        console.log(err.response);
      });

    // Based on results, if email or username is taken, API will tell me
    // Return 202 if ok and the user should be logged in, redirect to homepage
  };

  return (
    <View style={styles.container}>
      <View>
        <H1>Register Account</H1>
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
          <P>Don't worry, you can change these later in Settings.</P>
          <TextInput
            placeholder="Calorie limit (kcal)"
            onChangeText={(cal) => setCalories(cal)}
            value={calories}
            keyboardType="numeric"
          />
          <TextInput
            placeholder="Protein limit (g)"
            onChangeText={(p) => setProteins(p)}
            value={proteins}
            keyboardType="numeric"
          />
          <TextInput
            placeholder="Fats limit (g)"
            onChangeText={(f) => setFats(f)}
            value={fats}
            keyboardType="numeric"
          />
          <TextInput
            placeholder="Carbs limit (g)"
            onChangeText={(c) => setCarbs(c)}
            value={carbs}
            keyboardType="numeric"
          />
        </View>
        <View>
          <TextInput
            placeholder="Country (fullname)"
            onChangeText={(country) => setCountry(country)}
            value={country}
          />
          <TextInput
            placeholder="City (fullname)"
            onChangeText={(city) => setCity(city)}
            value={city}
          />
        </View>
        <View>
          <Button
            onPress={createAccountHandler}
            title="Create Account"
            color="#841584"
            accessibilityLabel="create account button"
          />
        </View>
      </View>
    </View>
  );
}

// TODO: Must check if city and country work with TimezoneDB API

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background,
    justifyContent: "center",
  },
});
