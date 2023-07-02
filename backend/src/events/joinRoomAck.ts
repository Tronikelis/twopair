import { Socket } from "socket.io";

import { JOIN_ROOM_ACK } from "~/config/events.js";
import { JoinRoomClient, JoinRoomServer, Room } from "~/types/socket.io.js";
import LRU from "~/utils/lru.js";

import { EventCb, SocketAck } from "./types.js";

const joinRoomAck: EventCb = (socket: Socket, db: LRU<string, Room>) => {
    return async ({ id, user }: JoinRoomClient, ack: SocketAck<JoinRoomServer>) => {
        console.log(JOIN_ROOM_ACK);
        console.log({
            id,
            user,
        });

        await socket.join(id);
        const roomInDb = db.get(id);

        if (!roomInDb) {
            const room: Room = {
                id,
                playing: false,
                time: 0,
                users: [user],
            };

            db.set(id, room);
            ack({ room });
            return;
        }

        const roomClone = structuredClone(roomInDb);
        if (!roomClone.users.find(x => x.id === user.id)) {
            roomClone.users.push(user);
        }

        db.set(id, roomClone);
        ack({ room: roomClone });
    };
};

export default joinRoomAck;
