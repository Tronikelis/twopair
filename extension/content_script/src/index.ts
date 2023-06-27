import browser from "webextension-polyfill";
import { GetVideoElementsRes, listenFromContent } from "~/comms";

import getVideoElements from "./getVideoElements";
import joinRoom from "./joinRoom";
import { JoinRoomClient } from "backend/src/types/socket.io";

listenFromContent(async (type, data) => {
    switch (type) {
        case "GET_VIDEO_ELEMENTS":
            return getVideoElements();

        case "JOIN_ROOM":
            // todo: ERROR HANDLING
            return await joinRoom(data as JoinRoomClient);
    }
});
