import { SET_WEBSITE_URL_ACK } from "backend/src/config/events";
import { SetWebsiteUrlClient, SetWebsiteUrlServer } from "backend/src/types/socket.io";

import { SetWebsiteUrlData, SetWebsiteUrlRes } from "~/comms";

import { socket } from "../socket.io";

export default async function setWebsiteUrl(
    input: SetWebsiteUrlData
): Promise<SetWebsiteUrlRes> {
    const response = (await socket.emitWithAck(
        SET_WEBSITE_URL_ACK,
        input satisfies SetWebsiteUrlClient
    )) as SetWebsiteUrlServer;

    return response;
}
