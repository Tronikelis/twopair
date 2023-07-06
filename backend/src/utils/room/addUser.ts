import { Room, User } from "~/types/socket.io.js";

/** mutates the passed in room */
export default function addUser(room: Room, user: User): void {
    const existsIdx = room.users.findIndex(x => x.id === user.id);
    if (existsIdx !== -1) {
        const u = room.users[existsIdx];
        if (!u) return;

        u.username = user.username;
        return;
    }

    if (room.users.length <= 0) {
        room.ownerId = user.id;
    }

    room.users.push(user);
}
