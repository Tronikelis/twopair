import { LEAVE_ROOM_ACK } from "backend/src/config/events";
import { LeaveRoomClient } from "backend/src/types/socket.io";

import { LeaveRoomData, LeaveRoomRes, sendToContent } from "~/comms";

import { socket } from "../socket.io";

export default async function leaveRoom(input: LeaveRoomData): Promise<LeaveRoomRes> {
    await sendToContent("LEAVE_ROOM", input);
    await socket.emitWithAck(LEAVE_ROOM_ACK, input satisfies LeaveRoomClient);
}
