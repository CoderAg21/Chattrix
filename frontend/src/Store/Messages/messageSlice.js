// src/redux/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    value:null
  },
  reducers: {
    createMsg: (state,msg) => {
        state.value = msg.payload
          },
    
  },
});

export const {createMsg} = messageSlice.actions;
export default messageSlice.reducer;
