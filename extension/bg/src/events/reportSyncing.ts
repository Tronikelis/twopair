import { REPORT_SYNCING_ACK } from "backend/src/config/events";
import { ReportSyncingClient } from "backend/src/types/socket.io";

import { ReportSyncingData, ReportSyncingRes } from "~/comms";

import { socket } from "../socket.io";

export default async function reportSyncing(
    input: ReportSyncingData
): Promise<ReportSyncingRes> {
    await socket.emitWithAck(REPORT_SYNCING_ACK, input satisfies ReportSyncingClient);
}
