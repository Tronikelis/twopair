import { REPORT_SYNCING_ACK } from "~/config/events.js";
import { ReportSyncingClient, ReportSyncingServer } from "~/types/socket.io.js";
import logger from "~/utils/logger.js";

import { EventCb, SocketAck } from "./types.js";

const reportSyncingAck: EventCb = (socket, { rooms, socketToRoom, socketToUser }) => {
    return ({ syncing }: ReportSyncingClient, ack: SocketAck<ReportSyncingServer>) => {
        logger.info({ payload: { syncing } }, REPORT_SYNCING_ACK);

        const userId = socketToUser.get(socket);
        if (!userId) return;

        const roomId = socketToRoom.get(socket);
        if (!roomId) return;

        const room = rooms.get(roomId)?.clone();
        if (!room) return;

        for (const user of room.data.users) {
            if (user.id !== userId) continue;
            user.syncing = syncing;
            break;
        }

        rooms.set(roomId, room);

        ack(undefined);
    };
};

export default reportSyncingAck;
