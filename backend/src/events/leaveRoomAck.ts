import { Socket } from "socket.io";

import { LEAVE_ROOM_ACK } from "~/config/events.js";
import { LeaveRoomClient, LeaveRoomServer, SocketAck } from "~/types/socket.io.js";

import { EventCb } from "./types.js";

// why doesn't ts complain that 1 argument is missing 🤷
const leaveRoomAck: EventCb = (socket: Socket) => {
    return async (_args: LeaveRoomClient, ack: SocketAck<LeaveRoomServer>) => {
        console.log(LEAVE_ROOM_ACK);

        await Promise.all(
            Array.from(socket.rooms).map(async room => await socket.leave(room))
        );

        ack(undefined);
    };
};

export default leaveRoomAck;
