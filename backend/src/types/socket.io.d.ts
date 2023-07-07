export interface RoomObj {
    id: string;
    playing: boolean;
    time: number;
    ownerId: string | undefined;
    websiteUrl: string | undefined;
    users: User[];
}

export interface User {
    id: string;
    username: string;
}

export interface GetRoomServer {
    room: RoomObj | undefined;
}
export interface GetRoomClient {
    roomId: string;
}

export interface JoinRoomClient {
    roomId: string;
    user: User;
}
export interface JoinRoomServer {
    room: RoomObj | undefined;
}

export interface LeaveRoomClient {
    roomId: string;
    userId: string;
}
export type LeaveRoomServer = undefined;

export type SyncRoomServer = Pick<RoomObj, "playing" | "time">;
export interface SyncRoomClient extends Pick<RoomObj, "playing" | "time"> {
    roomId: string;
}

export interface CreateRoomClient {
    user: User;
}
export interface CreateRoomServer {
    room: RoomObj;
}

export interface SetWebsiteUrlClient {
    websiteUrl: string;
    roomId: string;
}
export interface SetWebsiteUrlServer {
    room: RoomObj | undefined;
}
