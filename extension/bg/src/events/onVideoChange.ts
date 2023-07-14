import { SYNC_ROOM } from "backend/src/config/events";
import { SyncRoomClient } from "backend/src/types/socket.io";

import { OnVideoChangeData, OnVideoChangeRes } from "~/comms";

import { socket } from "../socket.io";

export default function onVideoChange(data: OnVideoChangeData): OnVideoChangeRes {
    socket.emit(SYNC_ROOM, data satisfies SyncRoomClient);
}
