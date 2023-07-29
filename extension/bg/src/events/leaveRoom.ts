import { LEAVE_ROOM_ACK } from "backend/src/config/events";
import { LeaveRoomClient } from "backend/src/types/socket.io";

import { LeaveRoomData, LeaveRoomRes, sendToContent } from "~/comms";
import tryCatch from "~/utils/tryCatch";

import globals from "../config/globals";
import { socket } from "../socket.io";

export default async function leaveRoom(input: LeaveRoomData): Promise<LeaveRoomRes> {
    if (globals.syncingTabId === undefined) {
        console.error("trying to leave a room when not in a room, syncingTabId is undefined");
        return;
    }

    const [err] = await tryCatch(() =>
        sendToContent(
            "LEAVE_ROOM",
            input,
            // sending this event to the currently syncing tab
            // for it to remove event listeners from the video
            { tabId: globals.syncingTabId, frameId: undefined }
        )
    );
    if (err) {
        console.error(err);
    }

    await socket.emitWithAck(LEAVE_ROOM_ACK, input satisfies LeaveRoomClient);

    globals.syncingTabId = undefined;
}
