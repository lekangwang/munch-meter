import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isVisible: false,
  component: undefined,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    displayComponent: (state, component) => {
      state.isVisible = true;
      state.component = component;
    },
    closeModal: (state) => {
      state.isVisible = false;
      state.component = undefined;
    },
    openModal: (state) => {
      state.isVisible = true;
      state.component = undefined;
    },
  },
});

export const { displayComponent, closeModal, openModal } = modalSlice.actions;
export default modalSlice.reducer;
