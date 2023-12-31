/// <reference types="vite/client" />

import {
    CreateRoomClient,
    CreateRoomServer,
    GetRoomClient,
    GetRoomServer,
    JoinRoomClient,
    JoinRoomServer,
    LeaveRoomClient,
    ReportSyncingClient,
    ReportSyncingServer,
    SetWebsiteUrlClient,
    SetWebsiteUrlServer,
} from "backend/src/types/socket.io";

export type MessageType =
    | "GET_VIDEO_ELEMENTS"
    | "SYNC_VIDEO"
    | "GET_ROOM"
    | "CREATE_ROOM"
    | "LEAVE_ROOM"
    | "JOIN_ROOM"
    | "SET_WEBSITE_URL"
    | "ON_VIDEO_CHANGE"
    | "GET_SYNCING_STATUS"
    | "REPORT_SYNCING"
    | "PING";

export interface GetVideoElementsRes {
    syncingId: string | undefined;
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

export type SetWebsiteUrlData = SetWebsiteUrlClient;
export type SetWebsiteUrlRes = SetWebsiteUrlServer;

export type GetSyncingStatusData = undefined;
export interface GetSyncingStatusRes {
    videoId: string | undefined;
    tabId: number | undefined;
}

export interface OnVideoChangeData {
    playing: boolean;
    time: number;
    roomId: string;
}
export type OnVideoChangeRes = undefined;

export type ReportSyncingData = ReportSyncingClient;
export type ReportSyncingRes = ReportSyncingServer;

export type Data = {
    GET_VIDEO_ELEMENTS: GetVideoElementsData;
    SYNC_VIDEO: SyncVideoData;
    LEAVE_ROOM: LeaveRoomData;
    GET_ROOM: GetRoomData;
    JOIN_ROOM: JoinRoomData;
    CREATE_ROOM: CreateRoomData;
    SET_WEBSITE_URL: SetWebsiteUrlData;
    ON_VIDEO_CHANGE: OnVideoChangeData;
    GET_SYNCING_STATUS: GetSyncingStatusData;
    REPORT_SYNCING: ReportSyncingData;
    PING: undefined;
};

export type Res = {
    GET_VIDEO_ELEMENTS: GetVideoElementsRes;
    SYNC_VIDEO: SyncVideoRes;
    LEAVE_ROOM: LeaveRoomRes;
    GET_ROOM: GetRoomRes;
    JOIN_ROOM: JoinRoomRes;
    CREATE_ROOM: CreateRoomRes;
    SET_WEBSITE_URL: SetWebsiteUrlRes;
    ON_VIDEO_CHANGE: OnVideoChangeRes;
    GET_SYNCING_STATUS: GetSyncingStatusRes;
    REPORT_SYNCING: ReportSyncingRes;
    PING: undefined;
};
