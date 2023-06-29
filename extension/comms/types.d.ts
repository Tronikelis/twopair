/// <reference types="vite/client" />

import { GetRoomClient, GetRoomServer, Room, User } from "backend/src/types/socket.io";

export type MessageType =
    | "GET_VIDEO_ELEMENTS"
    | "SET_SYNCING_VIDEO"
    | "UNSYNC_VIDEO"
    | "GET_ROOM";

export interface GetVideoElementsRes {
    videos: {
        id: string;
        time: number;
        playing: boolean;
        syncing: boolean;
    }[];
}

export type GetVideoElementsData = undefined;

export interface SetSyncingVideoData {
    roomId: string;
    videoId: string;
    user: User;
}

export interface SetSyncingVideoRes {
    room: Room;
}

export type UnsyncVideoData = undefined;
export type UnsyncVideoRes = undefined;

export type GetRoomData = GetRoomClient;
export type GetRoomRes = GetRoomServer;

export type Data = {
    GET_VIDEO_ELEMENTS: GetVideoElementsData;
    SET_SYNCING_VIDEO: SetSyncingVideoData;
    UNSYNC_VIDEO: UnsyncVideoData;
    GET_ROOM: GetRoomData;
};

export type Res = {
    GET_VIDEO_ELEMENTS: GetVideoElementsRes;
    SET_SYNCING_VIDEO: SetSyncingVideoRes;
    UNSYNC_VIDEO: UnsyncVideoRes;
    GET_ROOM: GetRoomRes;
};
