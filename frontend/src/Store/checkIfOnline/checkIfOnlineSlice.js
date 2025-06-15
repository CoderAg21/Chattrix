// src/redux/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const checkIfOnlineSlice = createSlice({
  name: "checkIfOnline",
  initialState: {
    value:"offline",
  },
  reducers: {
    checkOnline: (state, action) => {
       state.value = action.payload;
          },
    
  },
});

export const {checkOnline} = checkIfOnlineSlice.actions;
export default checkIfOnlineSlice.reducer;
