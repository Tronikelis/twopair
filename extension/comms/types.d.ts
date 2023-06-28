/// <reference types="vite/client" />

import {
    JoinRoomClient,
    JoinRoomServer,
    SyncRoomClient,
    SyncRoomServer,
} from "backend/src/types/socket.io";

export type MessageType =
    | "GET_VIDEO_ELEMENTS"
    | "JOIN_ROOM"
    | "SYNC_ROOM"
    | "SET_SYNCING_VIDEO";

export interface GetVideoElementsRes {
    videos: {
        id: string;
        src: string;
        playing: boolean;
        time: number;
    }[];
}

export type GetVideoElementsData = undefined;

export interface SetSyncingVideoData {
    videoId: string;
}

export type SetSyncingVideoRes = undefined;

export type SyncRoomData = Pick<SyncRoomClient, "fromUserId" | "roomId">;

export type Data = {
    GET_VIDEO_ELEMENTS: GetVideoElementsData;
    SET_SYNCING_VIDEO: SetSyncingVideoData;
    JOIN_ROOM: JoinRoomClient;
    SYNC_ROOM: SyncRoomData;
};

export type Res = {
    GET_VIDEO_ELEMENTS: GetVideoElementsRes;
    SET_SYNCING_VIDEO: SetSyncingVideoRes;
    JOIN_ROOM: JoinRoomServer;
    SYNC_ROOM: undefined;
};
