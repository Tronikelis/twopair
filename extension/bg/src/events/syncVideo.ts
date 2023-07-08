import { sendToContent, SyncVideoData, SyncVideoRes } from "~/comms";

import globals from "../config/globals";

export default async function syncVideo(input: SyncVideoData): Promise<SyncVideoRes> {
    globals.syncing = true;
    return await sendToContent("SYNC_VIDEO", input);
}
