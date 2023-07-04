import { JOIN_ROOM_ACK } from "~/config/events.js";
import { JoinRoomClient, JoinRoomServer } from "~/types/socket.io.js";

import { EventCb, SocketAck } from "./types.js";

const joinRoomAck: EventCb = (socket, { rooms, socketToRoom, socketToUser }) => {
    return async ({ roomId, user }: JoinRoomClient, ack: SocketAck<JoinRoomServer>) => {
        console.log(JOIN_ROOM_ACK);
        console.log({
            roomId,
            user,
        });

        const roomInDb = rooms.get(roomId);
        if (!roomInDb) {
            ack({ room: undefined });
            return;
        }

        await socket.join(roomId);
        socketToUser.set(socket, user.id);
        socketToRoom.set(socket, roomId);

        const roomClone = structuredClone(roomInDb);
        if (!roomClone.users.find(x => x.id === user.id)) {
            roomClone.users.push(user);
        }

        rooms.set(roomId, roomClone);
        ack({ room: roomClone });
    };
};

export default joinRoomAck;
