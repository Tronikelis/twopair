import { listenFromContent, SetSyncingVideoData } from "~/comms";

import getVideoElements from "./events/getVideoElements";
import setSyncingVideo from "./events/setSyncingVideo";

listenFromContent(async (type, data) => {
    switch (type) {
        case "GET_VIDEO_ELEMENTS":
            return getVideoElements();

        case "SET_SYNCING_VIDEO":
            // todo: error handling here
            return await setSyncingVideo(data as SetSyncingVideoData);
    }
});
