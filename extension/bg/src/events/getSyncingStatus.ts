import { GetSyncingStatusData, GetSyncingStatusRes, sendToContent } from "~/comms";
import tryCatch from "~/utils/tryCatch";

import globals from "../config/globals";

export default async function getSyncingStatus(
    _input: GetSyncingStatusData
): Promise<GetSyncingStatusRes> {
    const [err, videos] = await tryCatch(() => sendToContent("GET_VIDEO_ELEMENTS", undefined));
    if (err) {
        console.warn("content_script in active page is not injected");
    }

    return {
        syncing: globals.syncing,
        syncingId: videos?.syncingId,
    };
}
