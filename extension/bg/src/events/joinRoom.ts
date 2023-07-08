import { JOIN_ROOM_ACK } from "backend/src/config/events";
import { JoinRoomClient, JoinRoomServer } from "backend/src/types/socket.io";

import { JoinRoomData, JoinRoomRes } from "~/comms";

import { socket } from "../socket.io";

export default async function joinRoom(input: JoinRoomData): Promise<JoinRoomRes> {
    const room = (await socket.emitWithAck(
        JOIN_ROOM_ACK,
        input satisfies JoinRoomClient
    )) as JoinRoomServer;

    return room;
}
