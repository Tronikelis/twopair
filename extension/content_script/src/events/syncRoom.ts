import { SYNC_ROOM } from "backend/src/config/events";
import { SyncRoomClient, SyncRoomServer } from "backend/src/types/socket.io";

import { SyncRoomData } from "~/comms";

import { SYNC_MARGIN, VIDEO_ATTR_ID } from "../config/const";
import { socket } from "../socket.io";

import { syncingVideoId } from "./setSyncingVideo";

function getVideoElement(): HTMLVideoElement | undefined {
    const video = document.querySelector<HTMLVideoElement>(
        `[${VIDEO_ATTR_ID}="${syncingVideoId}"]`
    );
    return video || undefined;
}

let onSyncSocket: (...props: any) => void = () => {};
let onSyncVideo: (...props: any) => void = () => {};

export default function syncRoom(input: SyncRoomData) {
    socket.off(SYNC_ROOM, onSyncSocket);

    onSyncSocket = ({ fromUserId, time, playing }: SyncRoomServer) => {
        if (fromUserId === input.fromUserId) {
            return;
        }

        const video = getVideoElement();
        if (!video) return;

        if (playing !== !video.paused) {
            playing ? video.play() : video.pause();
        }
        if (Math.abs(video.currentTime - time) > SYNC_MARGIN) {
            video.currentTime = time;
        }
    };

    socket.on(SYNC_ROOM, onSyncSocket);

    const video = getVideoElement();
    if (!video) return;

    // tidy this up later

    video.removeEventListener("seeked", onSyncVideo);
    video.removeEventListener("play", onSyncVideo);
    video.removeEventListener("pause", onSyncVideo);

    onSyncVideo = () => {
        socket.emit(SYNC_ROOM, {
            fromUserId: input.fromUserId,
            playing: !video.paused,
            roomId: input.roomId,
            time: video.currentTime,
        } satisfies SyncRoomClient);
    };

    video.addEventListener("seeked", onSyncVideo);
    video.addEventListener("play", onSyncVideo);
    video.addEventListener("pause", onSyncVideo);
}
