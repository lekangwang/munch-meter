import { Provider } from "react-redux";
import { store } from "./store";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Modal, Text, Pressable } from "react-native";
import { H1 } from "./screens/util/Typography";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Home from "./screens/Home";
import History from "./screens/History";
import Search from "./screens/Search";
import Settings from "./screens/Settings";
import ModalTest from "./screens/Modal";

export default function App() {
  return (
    <Provider store={store}>
      {/* <ModalTest></ModalTest> */}
      {/* <Login></Login> */}
      <Register></Register>
    </Provider>
  );
}
