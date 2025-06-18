// src/redux/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const spinnerSlice = createSlice({
  name: "spinner",
  initialState: {
    value:'none'
  },
  reducers: {
    showSpinner: (state,flag) => {
        state.value = flag.payload
          },
    
  },
});

export const {showSpinner} = spinnerSlice.actions;
export default spinnerSlice.reducer;
