import { SYNC_ROOM } from "~/config/events.js";
import { SyncRoomClient, SyncRoomServer } from "~/types/socket.io.js";

import { EventCb } from "./types.js";

const syncRoom: EventCb = (socket, { rooms }) => {
    return ({ roomId, playing, time }: SyncRoomClient) => {
        console.log(SYNC_ROOM);
        console.log({ roomId, playing, time });

        const room = rooms.get(roomId);
        if (!room) return;

        const roomClone = structuredClone(room);
        roomClone.playing = playing;
        roomClone.time = time;
        rooms.set(roomId, roomClone);

        // excludes the socket that is sending this event
        socket.broadcast.to(roomId).emit(SYNC_ROOM, {
            playing,
            time,
        } satisfies SyncRoomServer);
    };
};

export default syncRoom;
