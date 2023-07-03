import { LEAVE_ROOM_ACK } from "~/config/events.js";
import { LeaveRoomClient, LeaveRoomServer } from "~/types/socket.io.js";

import { EventCb, SocketAck } from "./types.js";

// why doesn't ts complain that 1 argument is missing 🤷
const leaveRoomAck: EventCb = (socket, db) => {
    return async ({ roomId, userId }: LeaveRoomClient, ack: SocketAck<LeaveRoomServer>) => {
        console.log(LEAVE_ROOM_ACK);
        console.log({ roomId });

        const room = db.get(roomId);
        if (room) {
            const roomClone = structuredClone(room);
            roomClone.users = roomClone.users.filter(x => x.id !== userId);
            db.set(roomId, roomClone);
        }

        await Promise.all(
            Array.from(socket.rooms).map(async room => await socket.leave(room))
        );

        ack(undefined);
    };
};

export default leaveRoomAck;
