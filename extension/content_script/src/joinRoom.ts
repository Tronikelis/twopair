import { socket } from "./socket.io";

import { JOIN_ROOM } from "backend/src/config/events";
import { JoinRoomClient, JoinRoomServer } from "backend/src/types/socket.io";

export default async function joinRoom(
    input: JoinRoomClient
): Promise<JoinRoomServer> {
    // socket.off needs the same reference, probably
    let cb: (...args: any) => void = () => {};
    const room = new Promise<JoinRoomServer>((resolve, reject) => {
        // fail after 5 seconds
        const timeout = setTimeout(() => {
            reject(new Error("join room timeout"));
        }, 5e3);

        cb = (value: JoinRoomServer) => {
            clearTimeout(timeout);
            resolve(value);
        };

        socket.on(JOIN_ROOM, cb);
    });

    socket.emit(JOIN_ROOM, input satisfies JoinRoomClient);
    const awaitedRoom = await room;

    socket.off(JOIN_ROOM, cb);

    return awaitedRoom;
}
