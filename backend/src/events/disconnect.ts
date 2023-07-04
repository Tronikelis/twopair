import { EventCb } from "./types.js";

const disconnect: EventCb = (socket, { rooms, socketToRoom, socketToUser }) => {
    return () => {
        const userId = socketToUser.get(socket);
        if (!userId) return;

        const roomId = socketToRoom.get(socket);
        if (!roomId) return;

        const room = rooms.get(roomId);
        if (!room) return;

        const roomClone = structuredClone(room);
        room.users = room.users.filter(x => x.id !== userId);
        rooms.set(roomId, roomClone);

        socketToRoom.delete(socket);
        socketToUser.delete(socket);
    };
};

export default disconnect;
