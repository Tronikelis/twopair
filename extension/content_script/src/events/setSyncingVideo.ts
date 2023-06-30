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
import withinMargin from "../utils/withinMargin";

async function joinRoom(
    input: JoinRoomClient,
    video: HTMLVideoElement
): Promise<JoinRoomServer> {
    const response = (await socket.emitWithAck(
        JOIN_ROOM_ACK,
        input satisfies JoinRoomClient
    )) as JoinRoomServer;

    const {
        room: { playing, time },
    } = response;

    // sync up when joining the room
    // this is not the latest info btw me
    if (playing === video.paused) {
        playing ? void video.play() : video.pause();
    }
    if (!withinMargin(video.currentTime, time, SYNC_MARGIN)) {
        video.currentTime = time;
    }

    return response;
}

type AnyFn = (...args: any) => void;

export const references = {
    onSyncRoom: noop as AnyFn,
    onSyncVideo: noop as AnyFn,
};

function syncRoom(input: SetSyncingVideoData, video: HTMLVideoElement) {
    function removeVideoListeners() {
        for (const event of VIDEO_EVENTS_LISTEN) {
            video.removeEventListener(event, references.onSyncVideo);
        }
    }
    function addVideoListeners() {
        for (const event of VIDEO_EVENTS_LISTEN) {
            video.addEventListener(event, references.onSyncVideo);
        }
    }

    socket.off(SYNC_ROOM, references.onSyncRoom);
    references.onSyncRoom = ({ playing, time }: SyncRoomServer) => {
        // this probably removes some jank
        // but different websites behave differently
        removeVideoListeners();

        if (playing === video.paused) {
            playing ? void video.play() : video.pause();
        }
        if (!withinMargin(video.currentTime, time, SYNC_MARGIN)) {
            video.currentTime = time;
        }

        // this sometimes removes some back-n-forth jank
        // but different websites behave differently
        addVideoListeners();
    };
    socket.on(SYNC_ROOM, references.onSyncRoom);

    removeVideoListeners();
    references.onSyncVideo = () => {
        socket.emit(SYNC_ROOM, {
            roomId: input.roomId,
            playing: !video.paused,
            time: video.currentTime,
        } satisfies SyncRoomClient);
    };
    addVideoListeners();
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
