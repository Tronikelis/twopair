import { Server } from "socket.io";

import { JOIN_ROOM_ACK, LEAVE_ROOM_ACK, SYNC_ROOM } from "./config/events.js";
import {
    JoinRoomClient,
    JoinRoomServer,
    LeaveRoomClient,
    LeaveRoomServer,
    Room,
    SyncRoomClient,
    SyncRoomServer,
} from "./types/socket.io.js";

type SocketAck<T = undefined> = (input: T) => void;

const io = new Server({
    cors: {
        origin: "*",
    },
});

const db = new Map<string, Room>();

io.on("connection", socket => {
    console.log("socket joined !");

    socket.on(
        JOIN_ROOM_ACK,
        async ({ id, user }: JoinRoomClient, ack: SocketAck<JoinRoomServer>) => {
            console.log(JOIN_ROOM_ACK);
            console.log({
                id,
                user,
            });

            await socket.join(id);

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

            ack({ room });
        }
    );

    socket.on(SYNC_ROOM, ({ roomId, ...rest }: SyncRoomClient) => {
        console.log(SYNC_ROOM);
        console.log({ roomId, ...rest });

        const room = db.get(roomId);
        if (!room) return;

        room.playing = rest.playing;
        room.time = rest.time;

        // excludes the socket that is sending this event
        socket.broadcast.to(roomId).emit(SYNC_ROOM, {
            playing: room.playing,
            time: room.time,
        } satisfies SyncRoomServer);
    });

    socket.on(
        LEAVE_ROOM_ACK,
        async (_args: LeaveRoomClient, ack: SocketAck<LeaveRoomServer>) => {
            await Promise.all(
                Array.from(socket.rooms).map(async room => await socket.leave(room))
            );

            ack(undefined);
        }
    );
});

io.listen(3000);
