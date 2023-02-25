import { createSlice } from "@reduxjs/toolkit";
import { IOpenToastAction, IToastState } from "@utils/interfaces";

const initialState: IToastState = {
  open: false,
  severity: "success",
  message: "This is a snackbar",
};

const toastSlice = createSlice({
  name: "toast slice",
  initialState,
  reducers: {
    openToast(state, action: IOpenToastAction) {
      state = { open: true, ...action.payload };
    },
    closeToast(state) {
      state.open = false;
    },
  },
});

export const { openToast, closeToast } = toastSlice.actions;
export default toastSlice.reducer;
