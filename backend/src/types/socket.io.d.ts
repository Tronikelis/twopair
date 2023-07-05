export interface Room {
    id: string;
    playing: boolean;
    time: number;
    ownerId: string;
    websiteUrl?: string;
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
    roomId: string;
    user: User;
}
export interface JoinRoomServer {
    room: Room | undefined;
}

export interface LeaveRoomClient {
    roomId: string;
    userId: string;
}
export type LeaveRoomServer = undefined;

export type SyncRoomServer = Pick<Room, "playing" | "time">;
export interface SyncRoomClient extends Pick<Room, "playing" | "time"> {
    roomId: string;
}

export interface CreateRoomClient {
    user: User;
}
export interface CreateRoomServer {
    room: Room;
}
