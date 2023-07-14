import { RoomObj, User } from "~/types/socket.io.js";

export default class Room {
    public data: RoomObj;

    constructor(room: RoomObj) {
        this.data = structuredClone(room);
    }

    static defaults(id: string): Room {
        return new Room({
            id,
            playing: false,
            time: 0,
            users: [],
            ownerId: undefined,
            websiteUrl: undefined,
        });
    }

    public clone(): Room {
        return new Room(structuredClone(this.data));
    }

    public addUser(user: User): this {
        const data = this.data;

        const existsIdx = data.users.findIndex(x => x.id === user.id);
        if (existsIdx !== -1) {
            const u = data.users[existsIdx];
            if (!u) return this;

            u.username = user.username;
            return this;
        }

        if (data.users.length <= 0) {
            data.ownerId = user.id;
        }

        data.users.push(user);

        return this;
    }

    public removeUser(userId: string): this {
        const data = this.data;

        data.users = data.users.filter(x => x.id !== userId);

        if (!data.users.find(x => x.id === data.ownerId) && data.users.length >= 1) {
            data.ownerId = data.users[0]?.id as string;
        }

        return this;
    }

    public serialize(): RoomObj {
        return structuredClone(this.data);
    }
}
