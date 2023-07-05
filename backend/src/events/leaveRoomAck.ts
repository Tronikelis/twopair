import { LEAVE_ROOM_ACK } from "~/config/events.js";
import { LeaveRoomClient, LeaveRoomServer } from "~/types/socket.io.js";
import removeUser from "~/utils/removeUser.js";

import { EventCb, SocketAck } from "./types.js";

const leaveRoomAck: EventCb = (socket, { rooms, socketToRoom }) => {
    return async ({ roomId, userId }: LeaveRoomClient, ack: SocketAck<LeaveRoomServer>) => {
        console.log(LEAVE_ROOM_ACK);
        console.log({ roomId });

        const room = structuredClone(rooms.get(roomId));
        if (room) {
            removeUser(room, userId);
            rooms.set(roomId, room);
        }

        await Promise.all(Array.from(socket.rooms).map(async x => await socket.leave(x)));

        socketToRoom.delete(socket);

        ack(undefined);
    };
};

export default leaveRoomAck;
