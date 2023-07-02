export type SocketAck<T = undefined> = (input: T) => void;

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
