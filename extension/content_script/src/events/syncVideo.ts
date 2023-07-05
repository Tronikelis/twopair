import { SYNC_ROOM } from "backend/src/config/events";
import { SyncRoomClient, SyncRoomServer } from "backend/src/types/socket.io";

import { SyncVideoData, SyncVideoRes } from "~/comms";
import debounce from "~/utils/debounce";
import noop from "~/utils/noop";

import { SYNC_MARGIN, VIDEO_ATTR_IS_SYNCING, VIDEO_EVENTS_LISTEN } from "../config/const";
import { socket } from "../socket.io";
import getVideoElement from "../utils/getVideoElement";
import withinMargin from "../utils/withinMargin";

type AnyFn = (...args: any) => void;

export const references = {
    onSyncRoom: noop as AnyFn,
    onSyncVideo: noop as AnyFn,
};

function syncRoom(input: SyncVideoData, video: HTMLVideoElement) {
    references.onSyncRoom = ({ playing, time }: SyncRoomServer) => {
        if (playing === video.paused) {
            playing ? void video.play() : video.pause();
        }
        if (!withinMargin(video.currentTime, time, SYNC_MARGIN)) {
            video.currentTime = time;
        }
    };

    references.onSyncVideo = debounce(() => {
        socket.emit(SYNC_ROOM, {
            roomId: input.roomId,
            playing: !video.paused,
            time: video.currentTime,
        } satisfies SyncRoomClient);
    }, 100);
}

export default function syncVideo(input: SyncVideoData): SyncVideoRes {
    const video = getVideoElement(input.videoId);
    if (!video) return;

    // prevent duplicate event listeners race conditions
    if (video.getAttribute(VIDEO_ATTR_IS_SYNCING) === "true") return;
    video.setAttribute(VIDEO_ATTR_IS_SYNCING, "true");

    // reset listeners 1/2
    socket.off(SYNC_ROOM, references.onSyncRoom);
    for (const event of VIDEO_EVENTS_LISTEN) {
        video.removeEventListener(event, references.onSyncVideo);
    }

    syncRoom(input, video);

    // reset listeners 2/2
    socket.on(SYNC_ROOM, references.onSyncRoom);
    for (const event of VIDEO_EVENTS_LISTEN) {
        video.addEventListener(event, references.onSyncVideo);
    }

    // new user joined, reset the video for everyone (idk about this one)
    video.pause();
    video.currentTime = 0;
}
