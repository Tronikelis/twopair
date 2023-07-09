import { SYNC_ROOM } from "backend/src/config/events";
import { SyncRoomServer } from "backend/src/types/socket.io";
import { io } from "socket.io-client";

import { OnVideoChangeData, sendToContent } from "~/comms";

export const socket = io(
    import.meta.env.MODE === "production"
        ? "https://twopair.tronikel.lt"
        : "http://localhost:3000",
    { ackTimeout: 2e3, autoConnect: false }
);

let listening = false;

export function listenToSocket() {
    if (listening) return;

    socket.connect();
    listening = true;

    socket.on(SYNC_ROOM, async (data: SyncRoomServer) => {
        await sendToContent("ON_VIDEO_CHANGE", data satisfies OnVideoChangeData);
    });
}
