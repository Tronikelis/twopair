import { Socket } from "socket.io";

import { GET_ROOM_ACK } from "~/config/events.js";
import { Room, SocketAck } from "~/types/socket.io.js";
import LRU from "~/utils/lru.js";

import { EventCb } from "./types.js";

export interface GetRoomServer {
    room: Room | undefined;
}

export interface GetRoomClient {
    roomId: string;
}

const getRoomAck: EventCb = (_socket: Socket, db: LRU<string, Room>) => {
    return ({ roomId }: GetRoomClient, ack: SocketAck<GetRoomServer>) => {
        console.log(GET_ROOM_ACK);
        console.log({ roomId });

        const room = db.get(roomId) || undefined;
        ack({ room });
    };
};

export default getRoomAck;
