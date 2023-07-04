import { JOIN_ROOM_ACK } from "~/config/events.js";
import { JoinRoomClient, JoinRoomServer, Room } from "~/types/socket.io.js";

import { EventCb, SocketAck } from "./types.js";

const joinRoomAck: EventCb = (socket, { rooms, socketToRoom, socketToUser }) => {
    return async ({ id, user }: JoinRoomClient, ack: SocketAck<JoinRoomServer>) => {
        console.log(JOIN_ROOM_ACK);
        console.log({
            id,
            user,
        });

        await socket.join(id);
        socketToUser.set(socket, user.id);
        socketToRoom.set(socket, id);

        const roomInDb = rooms.get(id);

        if (!roomInDb) {
            const room: Room = {
                id,
                playing: false,
                time: 0,
                users: [user],
            };

            rooms.set(id, room);
            ack({ room });
            return;
        }

        const roomClone = structuredClone(roomInDb);
        if (!roomClone.users.find(x => x.id === user.id)) {
            roomClone.users.push(user);
        }

        rooms.set(id, roomClone);
        ack({ room: roomClone });
    };
};

export default joinRoomAck;
