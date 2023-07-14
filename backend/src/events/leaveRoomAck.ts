import { LEAVE_ROOM_ACK } from "~/config/events.js";
import { LeaveRoomClient, LeaveRoomServer } from "~/types/socket.io.js";
import logger from "~/utils/logger.js";

import { EventCb, SocketAck } from "./types.js";

const leaveRoomAck: EventCb = (socket, { rooms, socketToRoom }) => {
    return async ({ roomId, userId }: LeaveRoomClient, ack: SocketAck<LeaveRoomServer>) => {
        logger.info({ payload: { roomId, userId } }, LEAVE_ROOM_ACK);

        const room = rooms.get(roomId)?.clone();
        if (room) {
            room.removeUser(userId);
            rooms.set(roomId, room);
        }

        await Promise.all(Array.from(socket.rooms).map(async x => await socket.leave(x)));

        socketToRoom.delete(socket);

        ack(undefined);
    };
};

export default leaveRoomAck;
