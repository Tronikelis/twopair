import { LeaveRoomData, LeaveRoomRes } from "~/comms";

import { VIDEO_ATTR_IS_SYNCING, VIDEO_EVENTS_LISTEN } from "../config/const";

// some spaghetti here which I personally don't like
// we'll probably deal with this later
import { onSyncVideo } from "./syncVideo";

export default function leaveRoom(_input: LeaveRoomData): LeaveRoomRes {
    const videos = Array.from(document.querySelectorAll("video"));

    for (const event of VIDEO_EVENTS_LISTEN) {
        for (const video of videos) {
            video.removeEventListener(event, onSyncVideo);
            video.setAttribute(VIDEO_ATTR_IS_SYNCING, "false");
        }
    }
}
