import { SET_WEBSITE_URL_ACK } from "~/config/events.js";
import { SetWebsiteUrlClient, SetWebsiteUrlServer } from "~/types/socket.io.js";
import logger from "~/utils/logger.js";

import { EventCb, SocketAck } from "./types.js";

const setWebsiteUrlAck: EventCb = (_socket, { rooms }) => {
    return (
        { roomId, websiteUrl }: SetWebsiteUrlClient,
        ack: SocketAck<SetWebsiteUrlServer>
    ) => {
        logger.info({ payload: { roomId, websiteUrl: "REDACTED" } }, SET_WEBSITE_URL_ACK);

        const room = rooms.get(roomId)?.clone();
        if (!room) {
            ack({ room: undefined });
            return;
        }

        room.data.websiteUrl = websiteUrl;
        rooms.set(roomId, room);

        ack({ room: room.serialize() });
    };
};

export default setWebsiteUrlAck;
