import browser from "webextension-polyfill";

import {
    _ProxyToContentData,
    CreateRoomData,
    GetFramesData,
    GetRoomData,
    GetSyncingStatusData,
    GetVideoElementsData,
    GetVideoElementsRes,
    JoinRoomData,
    LeaveRoomData,
    ListenCb,
    OnVideoChangeData,
    ReportSyncingData,
    sendToContent,
    SetWebsiteUrlData,
    SyncVideoData,
} from "~/comms";
import tryCatch from "~/utils/tryCatch";

import createRoom from "./events/createRoom";
import getFrames from "./events/getFrames";
import getRoom from "./events/getRoom";
import getSyncingStatus from "./events/getSyncingStatus";
import joinRoom from "./events/joinRoom";
import leaveRoom from "./events/leaveRoom";
import onVideoChange from "./events/onVideoChange";
import reportSyncing from "./events/reportSyncing";
import setWebsiteUrl from "./events/setWebsiteUrl";
import syncVideo from "./events/syncVideo";
import keepAliveChrome from "./utils/keepAliveChrome";
import { listenToSocket } from "./socket.io";

keepAliveChrome();

const onMessage: ListenCb = async ({ type, data }) => {
    if (type !== "PING") {
        listenToSocket();
    }

    // TODO: ERR HANDLING ON ALL THESE ROUTES
    // HANDLE IF CONTENT SCRIPT IS LOADED
    // HANDLE IF SOCKET.IO CAN'T CONNECT
    // !!!
    switch (type) {
        // popup -> background -> content
        case "GET_VIDEO_ELEMENTS": {
            const [err, res] = await tryCatch(() =>
                sendToContent("GET_VIDEO_ELEMENTS", data as GetVideoElementsData, undefined)
            );
            if (err) {
                console.error(err);
                return { syncingId: undefined, videos: [] } as GetVideoElementsRes;
            }

            return res.data;
        }

        // popup -> background -> content
        case "SYNC_VIDEO":
            return await syncVideo(data as SyncVideoData);

        // popup -> background -> content
        case "LEAVE_ROOM":
            return await leaveRoom(data as LeaveRoomData);

        // popup -> background -> content
        case "GET_SYNCING_STATUS":
            return await getSyncingStatus(data as GetSyncingStatusData);

        // popup -> background
        case "CREATE_ROOM":
            return await createRoom(data as CreateRoomData);

        // popup -> background
        case "GET_ROOM":
            return await getRoom(data as GetRoomData);

        // popup -> background
        case "JOIN_ROOM":
            return await joinRoom(data as JoinRoomData);

        // popup -> background
        case "SET_WEBSITE_URL":
            return await setWebsiteUrl(data as SetWebsiteUrlData);

        // popup -> background
        case "REPORT_SYNCING":
            return await reportSyncing(data as ReportSyncingData);

        // content -> background
        case "ON_VIDEO_CHANGE":
            return onVideoChange(data as OnVideoChangeData);

        // content -> background
        case "GET_FRAMES":
            return await getFrames(data as GetFramesData);

        // content -> background -> content
        case "_PROXY_TO_CONTENT": {
            const { data: payload, frameId, type } = data as _ProxyToContentData;
            return await sendToContent(type, payload, { frameId, tabId: undefined });
        }

        // keep background script alive by sending filler events
        case "PING":
            return;

        default:
            throw new Error(`unknown type "${type}" in background script`);
    }
};

// this HAS to be in global scope because chrome does not register it otherwise
browser.runtime.onMessage.addListener(onMessage);
