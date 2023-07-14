import { sendToBg, SyncVideoData, SyncVideoRes } from "~/comms";
import debounce from "~/utils/debounce";
import noop from "~/utils/noop";

import { VIDEO_ATTR_IS_SYNCING, VIDEO_EVENTS_LISTEN } from "../config/const";
import globals from "../config/globals";
import getVideoElement from "../utils/getVideoElement";

export default function syncVideo(input: SyncVideoData): SyncVideoRes {
    const video = getVideoElement(input.videoId);
    if (!video) return;

    // prevent duplicate event listeners race conditions
    if (video.getAttribute(VIDEO_ATTR_IS_SYNCING) === "true") return;
    video.setAttribute(VIDEO_ATTR_IS_SYNCING, "true");

    for (const event of VIDEO_EVENTS_LISTEN) {
        video.removeEventListener(event, globals.onSyncVideo);
    }

    globals.onSyncVideo = debounce(() => {
        sendToBg("ON_VIDEO_CHANGE", {
            playing: !video.paused,
            time: video.currentTime,
            roomId: input.roomId,
        })
            // deal with this later
            .catch(noop);
    }, 100);

    for (const event of VIDEO_EVENTS_LISTEN) {
        video.addEventListener(event, globals.onSyncVideo);
    }

    // new user joined, reset the video for everyone (idk about this one)
    video.pause();
    video.currentTime = 0;
}
