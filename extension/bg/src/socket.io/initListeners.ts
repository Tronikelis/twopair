import { SYNC_ROOM } from "backend/src/config/events";
import { SyncRoomServer } from "backend/src/types/socket.io";

import { OnVideoChangeData, sendToContent } from "~/comms";

import { socket } from ".";

export default function initListeners() {
    socket.on(SYNC_ROOM, async (data: SyncRoomServer) => {
        await sendToContent("ON_VIDEO_CHANGE", data satisfies OnVideoChangeData);
    });
}
