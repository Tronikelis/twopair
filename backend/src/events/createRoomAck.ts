import { nanoid } from "nanoid/async";

import { CREATE_ROOM_ACK } from "~/config/events.js";
import { CreateRoomClient, CreateRoomServer } from "~/types/socket.io.js";
import logger from "~/utils/logger.js";
import Room from "~/utils/room.js";

import { EventCb, SocketAck } from "./types.js";

const createRoomAck: EventCb = (socket, { rooms, socketToRoom, socketToUser }) => {
    return async ({ user }: CreateRoomClient, ack: SocketAck<CreateRoomServer>) => {
        logger.info({ payload: { user } }, CREATE_ROOM_ACK);

        const roomId = await nanoid(6);

        await socket.join(roomId);

        const room = Room.defaults(roomId).addUser(user);

        rooms.set(roomId, room);
        socketToRoom.set(socket, roomId);
        socketToUser.set(socket, user.id);

        ack({ room: room.serialize() });
    };
};

export default createRoomAck;
