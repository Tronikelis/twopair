import { Server, Socket } from "socket.io";

import {
    CREATE_ROOM_ACK,
    GET_ROOM_ACK,
    JOIN_ROOM_ACK,
    LEAVE_ROOM_ACK,
    SET_WEBSITE_URL_ACK,
    SYNC_ROOM,
} from "./config/events.js";
import createRoomAck from "./events/createRoomAck.js";
import disconnect from "./events/disconnect.js";
import getRoomAck from "./events/getRoomAck.js";
import joinRoomAck from "./events/joinRoomAck.js";
import leaveRoomAck from "./events/leaveRoomAck.js";
import setWebsiteUrlAck from "./events/setWebsiteUrlAck.js";
import syncRoom from "./events/syncRoom.js";
import logger from "./utils/logger.js";
import LRU from "./utils/lru.js";
import Room from "./utils/room.js";

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
        logger.info("socket connected");

        socket.on("disconnect", disconnect(socket, db));

        socket.on(CREATE_ROOM_ACK, createRoomAck(socket, db));
        socket.on(GET_ROOM_ACK, getRoomAck(socket, db));
        socket.on(JOIN_ROOM_ACK, joinRoomAck(socket, db));
        socket.on(LEAVE_ROOM_ACK, leaveRoomAck(socket, db));
        socket.on(SYNC_ROOM, syncRoom(socket, db));
        socket.on(SET_WEBSITE_URL_ACK, setWebsiteUrlAck(socket, db));
    });

    const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
    io.listen(port);
    logger.info(`listening on ${port}`);
}

main();
