import { Server } from "socket.io";
import { GET_ROOM, JOIN_ROOM, SYNC_ROOM } from "./config/events.js";
import {
    GetRoomClient,
    GetRoomServer,
    JoinRoomClient,
    JoinRoomServer,
    Room,
    SyncRoomClient,
    SyncRoomServer,
} from "./types/socket.io.js";

const io = new Server({
    cors: {
        origin: "*",
    },
});

const db = new Map<string, Room>();

function socketRoomPrefix(id: string): string {
    return `socket_room:${id}`;
}

io.on("connection", socket => {
    console.log("socket joined !");

    socket.on(JOIN_ROOM, ({ id, user }: JoinRoomClient) => {
        console.log(JOIN_ROOM);
        console.log({
            id,
            user,
        });

        socket.join(socketRoomPrefix(id));

        let room: Room = {
            playing: false,
            time: 0,
            users: [user],
        };

        const roomInDb = db.get(id);

        if (!roomInDb) {
            db.set(id, room);
        } else {
            if (!roomInDb.users.find(x => x.id === user.id)) {
                roomInDb.users.push(user);
            }

            room = { ...roomInDb };
        }

        socket.emit(JOIN_ROOM, { room } satisfies JoinRoomServer);
    });

    socket.on(GET_ROOM, ({ id }: GetRoomClient) => {
        console.log(GET_ROOM);
        console.log({ id });

        socket.emit(GET_ROOM, {
            room: db.get(id) || null,
        } satisfies GetRoomServer);
    });

    socket.on(SYNC_ROOM, ({ id, playing, time }: SyncRoomClient) => {
        console.log(SYNC_ROOM);
        console.log({ id, playing, time });

        io.to(socketRoomPrefix(id)).emit(SYNC_ROOM, {
            playing,
            time,
        } satisfies SyncRoomServer);
    });
});

io.listen(3000);
