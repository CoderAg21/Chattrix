// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import userReducer from "./user/userSlice";
import contactReducer from "./contacts/contactSlice";
import messageReducer from "./Messages/messageSlice";
import roomReducer from "./room/roomSlice";
import checkIfOnlineReducer from './checkIfOnline/checkIfOnlineSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user:userReducer,
    contacts: contactReducer,
    message: messageReducer,
    room: roomReducer,
    checkIfOnline:checkIfOnlineReducer
  },
});

