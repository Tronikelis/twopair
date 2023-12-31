import { JOIN_ROOM_ACK } from "~/config/events.js";
import { JoinRoomClient, JoinRoomServer } from "~/types/socket.io.js";
import logger from "~/utils/logger.js";

import { EventCb, SocketAck } from "./types.js";

const joinRoomAck: EventCb = (socket, { rooms, socketToRoom, socketToUser }) => {
    return async ({ roomId, user }: JoinRoomClient, ack: SocketAck<JoinRoomServer>) => {
        logger.info({ payload: { roomId, user } }, JOIN_ROOM_ACK);

        const room = rooms.get(roomId)?.clone();
        if (!room) {
            ack({ room: undefined });
            return;
        }

        await socket.join(roomId);
        socketToUser.set(socket, user.id);
        socketToRoom.set(socket, roomId);

        room.addUser(user);
        rooms.set(roomId, room);

        ack({ room: room.serialize() });
    };
};

export default joinRoomAck;
