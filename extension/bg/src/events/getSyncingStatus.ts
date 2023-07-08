import { GetSyncingStatusData, GetSyncingStatusRes, sendToContent } from "~/comms";

import globals from "../config/globals";

export default async function getSyncingStatus(
    _input: GetSyncingStatusData
): Promise<GetSyncingStatusRes> {
    const videos = await sendToContent("GET_VIDEO_ELEMENTS", undefined);

    return {
        syncing: globals.syncing,
        syncingId: videos.syncingId,
    };
}
