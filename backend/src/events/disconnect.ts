import logger from "~/utils/logger.js";

import { EventCb } from "./types.js";

const disconnect: EventCb = (socket, { rooms, socketToRoom, socketToUser }) => {
    return () => {
        logger.info("socket disconnected");

        const userId = socketToUser.get(socket);
        if (!userId) return;

        const roomId = socketToRoom.get(socket);
        if (!roomId) return;

        const room = rooms.get(roomId)?.clone();
        if (!room) return;

        room.removeUser(userId);
        rooms.set(roomId, room);

        socketToRoom.delete(socket);
        socketToUser.delete(socket);
    };
};

export default disconnect;
