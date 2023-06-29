import { io } from "socket.io-client";

export const socket = io(
    import.meta.env.MODE === "production" ? "todo" : "http://localhost:3000",
    { ackTimeout: 5e3 }
);
