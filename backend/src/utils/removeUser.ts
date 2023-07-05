import { Room } from "~/types/socket.io.js";

/** mutates the passed in room */
export default function removeUser(room: Room, userId: string): void {
    room.users = room.users.filter(x => x.id !== userId);

    // if owner left, assign a new owner
    if (!room.users.find(x => x.id === room.ownerId) && room.users.length >= 1) {
        room.ownerId = room.users[0]?.id as string;
    }
}
