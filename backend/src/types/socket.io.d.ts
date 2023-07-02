export interface Room {
    id: string;
    playing: boolean;
    time: number;
    users: User[];
}

export interface User {
    id: string;
    username: string;
}

export interface GetRoomServer {
    room: Room | undefined;
}

export interface GetRoomClient {
    roomId: string;
}

export interface JoinRoomClient {
    id: string;
    user: User;
}

export interface JoinRoomServer {
    room: Room;
}

export type LeaveRoomClient = undefined;

export type LeaveRoomServer = undefined;

export type SyncRoomServer = Pick<Room, "playing" | "time">;

export interface SyncRoomClient extends Pick<Room, "playing" | "time"> {
    roomId: string;
}
