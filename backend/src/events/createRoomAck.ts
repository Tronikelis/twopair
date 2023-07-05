import { nanoid } from "nanoid/async";

import { CreateRoomClient, CreateRoomServer, Room } from "~/types/socket.io.js";

import { EventCb, SocketAck } from "./types.js";

const createRoomAck: EventCb = (socket, { rooms, socketToRoom, socketToUser }) => {
    return async (
        { user: { id: userId, username } }: CreateRoomClient,
        ack: SocketAck<CreateRoomServer>
    ) => {
        const roomId = await nanoid(6);

        await socket.join(roomId);

        const room: Room = {
            id: roomId,
            time: 0,
            playing: false,
            ownerId: userId,
            users: [{ id: userId, username }],
        };

        rooms.set(roomId, room);
        socketToRoom.set(socket, roomId);
        socketToUser.set(socket, userId);

        ack({ room });
    };
};

export default createRoomAck;
