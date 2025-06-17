// src/redux/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const contactSlice = createSlice({
  name: "contacts",
  initialState: {
    value:[
      
// {roomId: '684ed48b470bdc62a1e698c5', email: 'abhay1@gmail.com', name: 'abhay1'}, { roomId: "684ed48b470bdc62a1e698c5", email: "abhay@gmail.com", name: "abhay" }//abhay1
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
