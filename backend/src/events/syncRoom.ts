import { Socket } from "socket.io";

import { SYNC_ROOM } from "~/config/events.js";
import { Room } from "~/types/socket.io.js";
import LRU from "~/utils/lru.js";

import { EventCb } from "./types.js";

export type SyncRoomServer = Pick<Room, "playing" | "time">;

export interface SyncRoomClient extends Pick<Room, "playing" | "time"> {
    roomId: string;
}

const syncRoom: EventCb = (socket: Socket, db: LRU<string, Room>) => {
    return ({ roomId, playing, time }: SyncRoomClient) => {
        console.log(SYNC_ROOM);
        console.log({ roomId, playing, time });

        const room = db.get(roomId);
        if (!room) return;

        const roomClone = structuredClone(room);
        roomClone.playing = playing;
        roomClone.time = time;
        db.set(roomId, roomClone);

        // excludes the socket that is sending this event
        socket.broadcast.to(roomId).emit(SYNC_ROOM, {
            playing,
            time,
        } satisfies SyncRoomServer);
    };
};

export default syncRoom;
