import { Socket } from "socket.io";

import { DB } from "~/index.ts";

export type EventCb = (socket: Socket, db: DB) => (...args: any) => void | Promise<void>;

export type SocketAck<T = undefined> = (input: T) => void;
