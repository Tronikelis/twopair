import browser from "webextension-polyfill";

import {
    CreateRoomData,
    GetRoomData,
    GetSyncingStatusData,
    GetVideoElementsData,
    JoinRoomData,
    LeaveRoomData,
    ListenCb,
    OnVideoChangeData,
    sendToContent,
    SetWebsiteUrlData,
    SyncVideoData,
} from "~/comms";

import createRoom from "./events/createRoom";
import getRoom from "./events/getRoom";
import getSyncingStatus from "./events/getSyncingStatus";
import joinRoom from "./events/joinRoom";
import leaveRoom from "./events/leaveRoom";
import onVideoChange from "./events/onVideoChange";
import setWebsiteUrl from "./events/setWebsiteUrl";
import syncVideo from "./events/syncVideo";
import keepAliveChrome from "./utils/keepAliveChrome";
import { listenToSocket } from "./socket.io";

keepAliveChrome();

const onMessage: ListenCb = async ({ type, data }) => {
    listenToSocket();

    // TODO: ERR HANDLING ON ALL THESE ROUTES
    // HANDLE IF CONTENT SCRIPT IS LOADED
    // HANDLE IF SOCKET.IO CAN'T CONNECT
    // !!!
    switch (type) {
        // popup -> background -> content
        case "GET_VIDEO_ELEMENTS": {
            const { data: res } = await sendToContent(
                "GET_VIDEO_ELEMENTS",
                data as GetVideoElementsData,
                undefined
            );

            return res;
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

        // content -> background
        case "ON_VIDEO_CHANGE":
            return onVideoChange(data as OnVideoChangeData);

        // keep background script alive by sending filler events
        case "PING":
            return;

        default:
            throw new Error(`unknown type "${type}" in background script`);
    }
};

// this HAS to be in global scope because chrome does not register it otherwise
browser.runtime.onMessage.addListener(onMessage);
