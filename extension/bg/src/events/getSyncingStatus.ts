import { GetSyncingStatusData, GetSyncingStatusRes, sendToContent } from "~/comms";
import tryCatch from "~/utils/tryCatch";

import globals from "../config/globals";

export default async function getSyncingStatus(
    _input: GetSyncingStatusData
): Promise<GetSyncingStatusRes> {
    const [err, res] = await tryCatch(() =>
        sendToContent("GET_VIDEO_ELEMENTS", undefined, undefined)
    );
    if (err) {
        console.warn(err);
    }

    return {
        videoId: res?.data.syncingId,
        tabId: globals.syncingTabId,
    };
}
