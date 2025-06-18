// src/redux/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const contactSlice = createSlice({
  name: "contacts",
  initialState: {
    value:[
    ],
  },
  reducers: {
    fetchContacts: (state, contacts) => {
       state.value = contacts.payload;

          },
    
  },
});

export const {fetchContacts} = contactSlice.actions;
export default contactSlice.reducer;
