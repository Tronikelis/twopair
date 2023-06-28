import browser from "webextension-polyfill";
import {
    GetVideoElementsRes,
    SetSyncingVideoData,
    listenFromContent,
} from "~/comms";

import getVideoElements from "./getVideoElements";
import joinRoom from "./joinRoom";
import { JoinRoomClient, SyncRoomClient } from "backend/src/types/socket.io";
import syncRoom from "./syncRoom";
import setSyncingVideo from "./setSyncingVideo";

listenFromContent(async (type, data) => {
    switch (type) {
        case "GET_VIDEO_ELEMENTS":
            return getVideoElements();

        case "JOIN_ROOM":
            // todo: ERROR HANDLING
            return await joinRoom(data as JoinRoomClient);

        case "SYNC_ROOM":
            syncRoom(data as SyncRoomClient);
            return;

        case "SET_SYNCING_VIDEO":
            setSyncingVideo(data as SetSyncingVideoData);
            return;
    }
});
