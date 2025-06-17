import { io } from "socket.io-client";
import config from "../config/env";
const socket = io(config.APP_URL, {
  withCredentials: true,
});
export default socket;

