import { io } from "socket.io-client";

export const socket = io(
    (import.meta as any).env.MODE === "production"
        ? "todo"
        : "http://localhost:3000"
);
