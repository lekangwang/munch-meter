import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./reducers/modalSlice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
  },
});
