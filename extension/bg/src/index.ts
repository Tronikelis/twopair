import {
    CreateRoomData,
    GetRoomData,
    GetVideoElementsData,
    JoinRoomData,
    LeaveRoomData,
    listenFromScript,
    OnVideoChangeData,
    sendToContent,
    SetWebsiteUrlData,
    SyncVideoData,
} from "~/comms";

import createRoom from "./events/createRoom";
import getRoom from "./events/getRoom";
import joinRoom from "./events/joinRoom";
import leaveRoom from "./events/leaveRoom";
import onVideoChange from "./events/onVideoChange";
import setWebsiteUrl from "./events/setWebsiteUrl";
import { socket } from "./socket.io";

listenFromScript(async (type, data) => {
    socket.connect();

    switch (type) {
        // popup -> background -> content
        case "GET_VIDEO_ELEMENTS":
            return await sendToContent("GET_VIDEO_ELEMENTS", data as GetVideoElementsData);

        // popup -> background -> content
        case "SYNC_VIDEO":
            return await sendToContent("SYNC_VIDEO", data as SyncVideoData);

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
        case "LEAVE_ROOM":
            return await leaveRoom(data as LeaveRoomData);

        // popup -> background
        case "SET_WEBSITE_URL":
            return await setWebsiteUrl(data as SetWebsiteUrlData);

        // content -> background
        case "ON_VIDEO_CHANGE":
            return onVideoChange(data as OnVideoChangeData);
    }
});
