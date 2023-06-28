import { JoinRoomClient, SyncRoomClient } from "backend/src/types/socket.io";
import browser from "webextension-polyfill";

import { GetVideoElementsRes, listenFromContent, SetSyncingVideoData } from "~/comms";

import getVideoElements from "./events/getVideoElements";
import joinRoom from "./events/joinRoom";
import setSyncingVideo from "./events/setSyncingVideo";
import syncRoom from "./events/syncRoom";

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
