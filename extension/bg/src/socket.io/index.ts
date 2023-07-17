import { SYNC_ROOM } from "backend/src/config/events";
import { SyncRoomServer } from "backend/src/types/socket.io";
import { io } from "socket.io-client";

import { OnVideoChangeData, sendToContent } from "~/comms";

import globals from "../config/globals";

export const socket = io(
    import.meta.env.MODE === "production"
        ? "https://twopair.tronikel.lt"
        : "http://localhost:3000",
    {
        ackTimeout: 2e3,
        autoConnect: false,
        transports:
            // don't use http long-polling as chrome does not support it in bg script (service worker now)
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            typeof chrome !== "undefined" && typeof browser !== "undefined" // here checking if we are on firefox
                ? undefined
                : ["websocket"],
    }
);

let listening = false;

export function listenToSocket() {
    if (listening) return;

    socket.on(SYNC_ROOM, async (data: SyncRoomServer) => {
        if (globals.syncingTabId === undefined) {
            console.warn("ignoring sync events if not synced myself");
            return;
        }

        await sendToContent(
            "ON_VIDEO_CHANGE",
            data satisfies OnVideoChangeData,
            // changing the video on the correct tab
            globals.syncingTabId
        );
    });

    socket.connect();
    listening = true;
}
