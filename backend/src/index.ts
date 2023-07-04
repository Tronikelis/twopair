import { Server, Socket } from "socket.io";

import { GET_ROOM_ACK, JOIN_ROOM_ACK, LEAVE_ROOM_ACK, SYNC_ROOM } from "./config/events.js";
import disconnect from "./events/disconnect.js";
import getRoomAck from "./events/getRoomAck.js";
import joinRoomAck from "./events/joinRoomAck.js";
import leaveRoomAck from "./events/leaveRoomAck.js";
import syncRoom from "./events/syncRoom.js";
import { Room } from "./types/socket.io.js";
import LRU from "./utils/lru.js";

export interface DB {
    rooms: LRU<string, Room>;
    socketToRoom: WeakMap<Socket, string>;
    socketToUser: WeakMap<Socket, string>;
}

function main() {
    const io = new Server({
        cors: {
            origin: "*",
        },
    });

    const db: DB = {
        rooms: new LRU<string, Room>(5e3),
        socketToRoom: new WeakMap(),
        socketToUser: new WeakMap(),
    };

    io.on("connection", socket => {
        console.log("socket joined !");

        socket.on("disconnect", disconnect(socket, db));

        socket.on(JOIN_ROOM_ACK, joinRoomAck(socket, db));
        socket.on(SYNC_ROOM, syncRoom(socket, db));
        socket.on(LEAVE_ROOM_ACK, leaveRoomAck(socket, db));
        socket.on(GET_ROOM_ACK, getRoomAck(socket, db));
    });

    io.listen(process.env.PORT ? parseInt(process.env.PORT) : 3000);
}

main();
