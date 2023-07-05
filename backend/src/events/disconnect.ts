import removeUser from "~/utils/removeUser.js";

import { EventCb } from "./types.js";

const disconnect: EventCb = (socket, { rooms, socketToRoom, socketToUser }) => {
    return () => {
        console.log("socket disconnected");

        const userId = socketToUser.get(socket);
        if (!userId) return;

        const roomId = socketToRoom.get(socket);
        if (!roomId) return;

        const room = structuredClone(rooms.get(roomId));
        if (!room) return;

        removeUser(room, userId);
        rooms.set(roomId, room);

        socketToRoom.delete(socket);
        socketToUser.delete(socket);
    };
};

export default disconnect;
