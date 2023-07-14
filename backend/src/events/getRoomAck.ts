import { GET_ROOM_ACK } from "~/config/events.js";
import { GetRoomClient, GetRoomServer } from "~/types/socket.io.js";
import logger from "~/utils/logger.js";

import { EventCb, SocketAck } from "./types.js";

const getRoomAck: EventCb = (_socket, { rooms }) => {
    return ({ roomId }: GetRoomClient, ack: SocketAck<GetRoomServer>) => {
        logger.info({ payload: { roomId } }, GET_ROOM_ACK);

        const room = rooms.get(roomId)?.serialize() || undefined;
        ack({ room });
    };
};

export default getRoomAck;
