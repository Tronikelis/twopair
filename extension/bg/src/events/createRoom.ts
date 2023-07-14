import { CREATE_ROOM_ACK } from "backend/src/config/events";
import { CreateRoomClient, CreateRoomServer } from "backend/src/types/socket.io";

import { CreateRoomData, CreateRoomRes } from "~/comms";

import { socket } from "../socket.io";

export default async function crateRoom(input: CreateRoomData): Promise<CreateRoomRes> {
    const room = (await socket.emitWithAck(
        CREATE_ROOM_ACK,
        input satisfies CreateRoomClient
    )) as CreateRoomServer;

    return room;
}
