import { LEAVE_ROOM_ACK } from "~/config/events.js";
import { LeaveRoomClient, LeaveRoomServer } from "~/types/socket.io.js";
import removeUser from "~/utils/removeUser.js";

import { EventCb, SocketAck } from "./types.js";

const leaveRoomAck: EventCb = (socket, { rooms, socketToRoom }) => {
    return async ({ roomId, userId }: LeaveRoomClient, ack: SocketAck<LeaveRoomServer>) => {
        console.log(LEAVE_ROOM_ACK);
        console.log({ roomId });

        const room = rooms.get(roomId);
        if (room) {
            const roomClone = structuredClone(room);
            removeUser(roomClone, userId);
            rooms.set(roomId, roomClone);
        }

        await Promise.all(
            Array.from(socket.rooms).map(async room => await socket.leave(room))
        );

        socketToRoom.delete(socket);

        ack(undefined);
    };
};

export default leaveRoomAck;
