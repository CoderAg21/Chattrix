// src/redux/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    email: null,
    userId: null,
    iat: null,
  },
  reducers: {
    identity: (state,action) => {
      const {email,userId,iat} = action.payload
        state.email = email;
        state.userId = userId;
        state.iat = iat;
          },
    
  },
});

export const {identity} = userSlice.actions;
export default userSlice.reducer;
