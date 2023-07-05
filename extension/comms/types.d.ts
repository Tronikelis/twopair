/// <reference types="vite/client" />

import {
    CreateRoomClient,
    CreateRoomServer,
    GetRoomClient,
    GetRoomServer,
    JoinRoomClient,
    JoinRoomServer,
    LeaveRoomClient,
} from "backend/src/types/socket.io";

export type MessageType =
    | "GET_VIDEO_ELEMENTS"
    | "SYNC_VIDEO"
    | "GET_ROOM"
    | "CREATE_ROOM"
    | "LEAVE_ROOM"
    | "JOIN_ROOM";

export interface GetVideoElementsRes {
    syncingId?: string;
    videos: {
        id: string;
        time: number;
        playing: boolean;
    }[];
}
export type GetVideoElementsData = undefined;

export interface SyncVideoData {
    videoId: string;
    roomId: string;
}
export type SyncVideoRes = undefined;

export type LeaveRoomData = LeaveRoomClient;
export type LeaveRoomRes = undefined;

export type GetRoomData = GetRoomClient;
export type GetRoomRes = GetRoomServer;

export type JoinRoomData = JoinRoomClient;
export type JoinRoomRes = JoinRoomServer;

export type CreateRoomData = CreateRoomClient;
export type CreateRoomRes = CreateRoomServer;

export type Data = {
    GET_VIDEO_ELEMENTS: GetVideoElementsData;
    SYNC_VIDEO: SyncVideoData;
    LEAVE_ROOM: LeaveRoomData;
    GET_ROOM: GetRoomData;
    JOIN_ROOM: JoinRoomData;
    CREATE_ROOM: CreateRoomData;
};

export type Res = {
    GET_VIDEO_ELEMENTS: GetVideoElementsRes;
    SYNC_VIDEO: SyncVideoRes;
    LEAVE_ROOM: LeaveRoomRes;
    GET_ROOM: GetRoomRes;
    JOIN_ROOM: JoinRoomRes;
    CREATE_ROOM: CreateRoomRes;
};
