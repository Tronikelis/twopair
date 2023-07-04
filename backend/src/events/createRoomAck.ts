import { nanoid } from "nanoid/async";

import { CreateRoomClient, CreateRoomServer, Room } from "~/types/socket.io.js";

import { EventCb, SocketAck } from "./types.js";

const createRoomAck: EventCb = (socket, { rooms, socketToRoom, socketToUser }) => {
    return async (
        { user: { id: userId, username }, websiteUrl }: CreateRoomClient,
        ack: SocketAck<CreateRoomServer>
    ) => {
        let roomId = "";
        while (rooms.get(roomId)) {
            roomId = await nanoid(6);
        }

        await socket.join(roomId);

        const room: Room = {
            id: roomId,
            time: 0,
            playing: false,
            websiteUrl,
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
