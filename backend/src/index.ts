import { Server } from "socket.io";

import { JOIN_ROOM, SYNC_ROOM } from "./config/events.js";
import {
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

    socket.on(JOIN_ROOM, async ({ id, user }: JoinRoomClient) => {
        console.log(JOIN_ROOM);
        console.log({
            id,
            user,
        });

        await Promise.all(
            Array.from(socket.rooms)
                .filter(room => room.startsWith(socketRoomPrefix("")))
                .map(async room => await socket.leave(room))
        );
        await socket.join(socketRoomPrefix(id));

        let room: Room = {
            id,
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

    socket.on(SYNC_ROOM, ({ roomId, ...rest }: SyncRoomClient) => {
        console.log(SYNC_ROOM);
        console.log({ roomId, ...rest });

        const room = db.get(roomId);
        if (!room) return;

        room.playing = rest.playing;
        room.time = rest.time;

        io.to(socketRoomPrefix(roomId)).emit(SYNC_ROOM, {
            roomId,
            ...rest,
        } satisfies SyncRoomServer);
    });
});

io.listen(3000);
