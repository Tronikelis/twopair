import { JoinRoomClient, JoinRoomServer } from "backend/src/types/socket.io";

export type MessageType = "GET_VIDEO_ELEMENTS" | "JOIN_ROOM";

export interface GetVideoElementsRes {
    videos: {
        id: string;
        src: string;
    }[];
}

export type GetVideoElementsData = undefined;

export type Data = {
    GET_VIDEO_ELEMENTS: GetVideoElementsData;
    JOIN_ROOM: JoinRoomClient;
};

export type Res = {
    GET_VIDEO_ELEMENTS: GetVideoElementsRes;
    JOIN_ROOM: JoinRoomServer;
};
