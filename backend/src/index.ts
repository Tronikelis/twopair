import { Server } from "socket.io";

import { GET_ROOM_ACK, JOIN_ROOM_ACK, LEAVE_ROOM_ACK, SYNC_ROOM } from "./config/events.js";
import getRoomAck from "./events/getRoomAck.js";
import joinRoomAck from "./events/joinRoomAck.js";
import leaveRoomAck from "./events/leaveRoomAck.js";
import syncRoom from "./events/syncRoom.js";
import { Room } from "./types/socket.io.js";
import LRU from "./utils/lru.js";

function main() {
    const io = new Server({
        cors: {
            origin: "*",
        },
    });

    const db = new LRU<string, Room>(5e3);

    io.on("connection", socket => {
        console.log("socket joined !");

        socket.on(JOIN_ROOM_ACK, joinRoomAck(socket, db));
        socket.on(SYNC_ROOM, syncRoom(socket, db));
        socket.on(LEAVE_ROOM_ACK, leaveRoomAck(socket, db));
        socket.on(GET_ROOM_ACK, getRoomAck(socket, db));
    });

    io.listen(3000);
}

main();
