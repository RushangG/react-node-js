import { io } from "socket.io-client";

const BASE_URL = "http://localhost:4321";

//socket.io client setup

export const socket = io(BASE_URL, {
  autoConnect: false,
});
