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

export interface JoinRoomClient {
    id: string;
    user: User;
}

export interface JoinRoomServer {
    room: Room;
}

export interface SyncRoomClient extends Pick<Room, "playing" | "time"> {
    roomId: string;
    fromUserId: string;
}

export type SyncRoomServer = SyncRoomClient;
