import { SYNC_ROOM } from "~/config/events.js";
import { SyncRoomClient, SyncRoomServer } from "~/types/socket.io.js";
import logger from "~/utils/logger.js";

import { EventCb } from "./types.js";

const syncRoom: EventCb = (socket, { rooms }) => {
    return ({ roomId, playing, time }: SyncRoomClient) => {
        logger.info({ payload: { roomId, playing, time } }, SYNC_ROOM);

        const room = rooms.get(roomId)?.clone();
        if (!room) return;

        room.playing = playing;
        room.time = time;
        rooms.set(roomId, room);

        // excludes the socket that is sending this event
        socket.broadcast.to(roomId).emit(SYNC_ROOM, {
            playing,
            time,
        } satisfies SyncRoomServer);
    };
};

export default syncRoom;
