import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user slice",
  initialState,
  reducers: {
    toggleAuthenticate(state, action) {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { toggleAuthenticate } = userSlice.actions;

export default userSlice.reducer;
