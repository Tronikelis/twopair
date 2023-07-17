import { sendToContent, SyncVideoData, SyncVideoRes } from "~/comms";

import globals from "../config/globals";

export default async function syncVideo(input: SyncVideoData): Promise<SyncVideoRes> {
    const { data, tabId } = await sendToContent("SYNC_VIDEO", input, undefined);
    globals.syncingTabId = tabId;

    return data;
}
