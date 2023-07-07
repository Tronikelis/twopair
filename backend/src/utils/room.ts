import { RoomObj, User } from "~/types/socket.io.js";

export default class Room {
    public id: string;
    public playing: boolean;
    public time: number;
    public ownerId?: string;
    public websiteUrl?: string;
    public users: User[];

    constructor(room: RoomObj) {
        this.id = room.id;
        this.playing = room.playing;
        this.time = room.time;
        this.ownerId = room.ownerId;
        this.users = room.users;
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
        return new Room({
            id: this.id,
            ownerId: this.ownerId,
            playing: this.playing,
            time: this.time,
            websiteUrl: this.websiteUrl,
            users: structuredClone(this.users),
        });
    }

    public addUser(user: User): this {
        const existsIdx = this.users.findIndex(x => x.id === user.id);
        if (existsIdx !== -1) {
            const u = this.users[existsIdx];
            if (!u) return this;

            u.username = user.username;
            return this;
        }

        if (this.users.length <= 0) {
            this.ownerId = user.id;
        }

        this.users.push(user);

        return this;
    }

    public removeUser(userId: string): this {
        this.users = this.users.filter(x => x.id !== userId);

        if (!this.users.find(x => x.id === this.ownerId) && this.users.length >= 1) {
            this.ownerId = this.users[0]?.id as string;
        }

        return this;
    }

    public serialize(): RoomObj {
        return {
            id: this.id,
            ownerId: this.ownerId,
            playing: this.playing,
            time: this.time,
            websiteUrl: this.websiteUrl,
            users: this.users,
        };
    }
}
