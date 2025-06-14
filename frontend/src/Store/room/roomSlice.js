// src/redux/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const roomSlice = createSlice({
  name: "room",
  initialState: {
    value:null
  },
  reducers: {
    changeRoom: (state,id) => {
        state.value = id.payload
          },
    
  },
});

export const {changeRoom} = roomSlice.actions;
export default roomSlice.reducer;
