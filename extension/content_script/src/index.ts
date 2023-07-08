import { LeaveRoomData, listenFromScript, OnVideoChangeData, SyncVideoData } from "~/comms";

import getVideoElements from "./events/getVideoElements";
import leaveRoom from "./events/leaveRoom";
import onVideoChange from "./events/onVideoChange";
import syncVideo from "./events/syncVideo";

// eslint-disable-next-line @typescript-eslint/require-await
listenFromScript(async (type, data) => {
    switch (type) {
        case "GET_VIDEO_ELEMENTS":
            return getVideoElements(undefined);

        case "SYNC_VIDEO":
            return syncVideo(data as SyncVideoData);

        case "ON_VIDEO_CHANGE":
            return onVideoChange(data as OnVideoChangeData);

        case "LEAVE_ROOM":
            return leaveRoom(data as LeaveRoomData);

        default:
            throw new Error(`unknown type "${type}" in content script`);
    }
});
