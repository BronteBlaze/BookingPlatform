import { io } from "socket.io-client";

// Socket IO
const URL = "http://192.168.1.41:8585";

const socket = io(URL, {
  autoConnect: false,
});

export default socket;
