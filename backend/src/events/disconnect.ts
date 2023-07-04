import { EventCb } from "./types.js";

const disconnect: EventCb = (socket, { rooms, socketToRoom, socketToUser }) => {
    return () => {
        console.log("socket disconnected");

        const userId = socketToUser.get(socket);
        if (!userId) return;

        const roomId = socketToRoom.get(socket);
        if (!roomId) return;

        const room = rooms.get(roomId);
        if (!room) return;

        const roomClone = structuredClone(room);
        roomClone.users = roomClone.users.filter(x => x.id !== userId);
        rooms.set(roomId, roomClone);

        socketToRoom.delete(socket);
        socketToUser.delete(socket);
    };
};

export default disconnect;
