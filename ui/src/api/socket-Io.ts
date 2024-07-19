import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_BASE_URI);

export { socket }