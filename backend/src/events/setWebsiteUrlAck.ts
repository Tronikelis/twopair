import { SetWebsiteUrlClient, SetWebsiteUrlServer } from "~/types/socket.io.js";

import { EventCb, SocketAck } from "./types.js";

const setWebsiteUrlAck: EventCb = (_socket, { rooms }) => {
    return (
        { roomId, websiteUrl }: SetWebsiteUrlClient,
        ack: SocketAck<SetWebsiteUrlServer>
    ) => {
        const room = structuredClone(rooms.get(roomId));
        if (!room) {
            ack({ room: undefined });
            return;
        }

        room.websiteUrl = websiteUrl;
        rooms.set(roomId, room);

        ack({ room });
    };
};

export default setWebsiteUrlAck;
