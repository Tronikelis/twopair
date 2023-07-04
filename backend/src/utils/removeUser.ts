import { Room } from "~/types/socket.io.js";

/** mutates the passed in room */
export default function removeUser(room: Room, userId: string): void {
    const roomClone = structuredClone(room);

    roomClone.users = roomClone.users.filter(x => x.id !== userId);

    // if owner left, assign a new owner
    if (
        !roomClone.users.find(x => x.id === roomClone.ownerId) &&
        roomClone.users.length >= 1
    ) {
        roomClone.ownerId = roomClone.users[0]?.id as string;
    }
}
