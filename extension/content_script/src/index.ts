import {
    CreateRoomData,
    GetRoomData,
    JoinRoomData,
    LeaveRoomData,
    listenFromContent,
    SyncVideoData,
} from "~/comms";

import createRoom from "./events/createRoom";
import getRoom from "./events/getRoom";
import getVideoElements from "./events/getVideoElements";
import joinRoom from "./events/joinRoom";
import leaveRoom from "./events/leaveRoom";
import syncVideo from "./events/syncVideo";

listenFromContent(async (type, data) => {
    switch (type) {
        case "GET_VIDEO_ELEMENTS":
            return getVideoElements(undefined);

        case "CREATE_ROOM":
            return await createRoom(data as CreateRoomData);

        case "GET_ROOM":
            return await getRoom(data as GetRoomData);

        case "JOIN_ROOM":
            return await joinRoom(data as JoinRoomData);

        case "LEAVE_ROOM":
            return await leaveRoom(data as LeaveRoomData);

        case "SYNC_VIDEO":
            return syncVideo(data as SyncVideoData);
    }
});
