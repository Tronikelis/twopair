import { LeaveRoomData, LeaveRoomRes } from "~/comms";

import { VIDEO_ATTR_IS_SYNCING, VIDEO_EVENTS_LISTEN } from "../config/const";
import globals from "../config/globals";

export default function leaveRoom(_input: LeaveRoomData): LeaveRoomRes {
    const videos = Array.from(document.querySelectorAll("video"));

    for (const event of VIDEO_EVENTS_LISTEN) {
        for (const video of videos) {
            video.removeEventListener(event, globals.onSyncVideo);
            video.setAttribute(VIDEO_ATTR_IS_SYNCING, "false");
        }
    }
}
