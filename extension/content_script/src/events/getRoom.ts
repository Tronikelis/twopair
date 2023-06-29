import { GET_ROOM_ACK } from "backend/src/config/events";
import { GetRoomClient, GetRoomServer } from "backend/src/types/socket.io";

import { GetRoomData, GetRoomRes } from "~/comms";

import { socket } from "../socket.io";

export default async function getRoom(input: GetRoomData): Promise<GetRoomRes> {
    const response = (await socket.emitWithAck(
        GET_ROOM_ACK,
        input satisfies GetRoomClient
    )) as GetRoomServer;

    return response;
}
