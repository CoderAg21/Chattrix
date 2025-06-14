// src/redux/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    user: null,
  },
  reducers: {
    loggedIn: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload; // optional user data
    },
    loggedOut: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { loggedIn, loggedOut } = authSlice.actions;
export default authSlice.reducer;
