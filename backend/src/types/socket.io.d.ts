export interface Room {
    playing: boolean;
    time: number;
    users: User[];
}

export interface User {
    id: string;
    username: string;
}

export interface JoinRoomClient {
    id: string;
    user: User;
}

export interface JoinRoomServer {
    room: Room;
}

export type SyncRoomServer = Pick<Room, "playing" | "time">;

export type SyncRoomClient = {
    id: string;
} & Pick<Room, "playing" | "time">;

export interface GetRoomClient {
    id: string;
}

export interface GetRoomServer {
    room: Room | null;
}
