import { JOIN_ROOM_ACK, SYNC_ROOM } from "backend/src/config/events";
import {
    JoinRoomClient,
    JoinRoomServer,
    SyncRoomClient,
    SyncRoomServer,
} from "backend/src/types/socket.io";

import { SetSyncingVideoData, SetSyncingVideoRes } from "~/comms";
import noop from "~/utils/noop";

import { SYNC_MARGIN, VIDEO_ATTR_IS_SYNCING, VIDEO_EVENTS_LISTEN } from "../config/const";
import { socket } from "../socket.io";
import getVideoElement from "../utils/getVideoElement";

async function joinRoom(
    input: JoinRoomClient,
    video: HTMLVideoElement
): Promise<JoinRoomServer> {
    const response = (await socket.emitWithAck(
        JOIN_ROOM_ACK,
        input satisfies JoinRoomClient
    )) as JoinRoomServer;

    // sync up when joining the room
    video.currentTime = response.room.time;
    response.room.playing ? void video.play() : video.pause();

    return response;
}

type AnyFn = (...args: any) => void;

export const references = {
    onSyncRoom: noop as AnyFn,
    onSyncVideo: noop as AnyFn,
};

function syncRoom(input: SetSyncingVideoData, video: HTMLVideoElement) {
    socket.off(SYNC_ROOM, references.onSyncRoom);
    references.onSyncRoom = ({ playing, time }: SyncRoomServer) => {
        if (playing === video.paused) {
            playing ? void video.play() : video.pause();
        }
        if (Math.abs(video.currentTime - time) > SYNC_MARGIN) {
            video.currentTime = time;
        }
    };

    socket.on(SYNC_ROOM, references.onSyncRoom);

    for (const event of VIDEO_EVENTS_LISTEN) {
        video.removeEventListener(event, references.onSyncVideo);
    }

    references.onSyncVideo = () => {
        socket.emit(SYNC_ROOM, {
            roomId: input.roomId,
            playing: !video.paused,
            time: video.currentTime,
        } satisfies SyncRoomClient);
    };

    for (const event of VIDEO_EVENTS_LISTEN) {
        video.addEventListener(event, references.onSyncVideo);
    }
}

export default async function setSyncingVideo(
    input: SetSyncingVideoData
): Promise<SetSyncingVideoRes | undefined> {
    const video = getVideoElement(input.videoId);
    if (!video) return;

    video.setAttribute(VIDEO_ATTR_IS_SYNCING, "true");

    const room = await joinRoom({ id: input.roomId, user: input.user }, video);
    syncRoom(input, video);

    return room;
}
