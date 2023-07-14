import { LEAVE_ROOM_ACK } from "backend/src/config/events";
import { LeaveRoomClient } from "backend/src/types/socket.io";

import { LeaveRoomData, LeaveRoomRes, sendToContent } from "~/comms";
import tryCatch from "~/utils/tryCatch";

import globals from "../config/globals";
import { socket } from "../socket.io";

export default async function leaveRoom(input: LeaveRoomData): Promise<LeaveRoomRes> {
    globals.syncing = false;

    const [err] = await tryCatch(() => sendToContent("LEAVE_ROOM", input));
    if (err) {
        console.warn("content_script not injected when calling leaveRoom in bg");
    }

    await socket.emitWithAck(LEAVE_ROOM_ACK, input satisfies LeaveRoomClient);
}
