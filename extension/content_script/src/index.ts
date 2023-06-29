import { GetRoomData, listenFromContent, SetSyncingVideoData, UnsyncVideoData } from "~/comms";

import getRoom from "./events/getRoom";
import getVideoElements from "./events/getVideoElements";
import setSyncingVideo from "./events/setSyncingVideo";
import unsyncVideo from "./events/unsyncVideo";

listenFromContent(async (type, data) => {
    switch (type) {
        case "GET_VIDEO_ELEMENTS":
            return getVideoElements(undefined);

        case "SET_SYNCING_VIDEO":
            // todo: error handling here
            return await setSyncingVideo(data as SetSyncingVideoData);

        case "UNSYNC_VIDEO":
            return await unsyncVideo(data as UnsyncVideoData);

        case "GET_ROOM":
            return await getRoom(data as GetRoomData);
    }
});
