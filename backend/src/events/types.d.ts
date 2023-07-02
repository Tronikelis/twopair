import { Socket } from "socket.io";

import { Room } from "~/types/socket.io.js";
import LRU from "~/utils/lru.ts";

export type EventCb = (
    socket: Socket,
    db: LRU<string, Room>
) => (...args: any) => void | Promise<void>;

export type SocketAck<T = undefined> = (input: T) => void;
