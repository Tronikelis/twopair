import browser from "webextension-polyfill";

import type { Data, MessageType, Res } from "./types";

export type * from "./types";

export type ListenCb = ({
    type,
    data,
}: {
    type: MessageType;
    data: Data[MessageType];
}) => Promise<Res[MessageType]>;

type ContentValidTypes = Extract<
    MessageType,
    "GET_VIDEO_ELEMENTS" | "SYNC_VIDEO" | "ON_VIDEO_CHANGE" | "LEAVE_ROOM"
>;
type BackgroundValidTypes = MessageType;

export async function sendToContent<Type extends ContentValidTypes>(
    type: Type,
    data: Data[Type]
): Promise<Res[Type]> {
    const tabs = await browser.tabs.query({
        currentWindow: true,
        active: true,
    });

    const tab = tabs[0];
    if (!tab?.id) throw new Error("did not found active tab");

    const res = (await browser.tabs.sendMessage(tab.id, { type, data })) as Res[Type];
    return res;
}

export async function sendToBg<Type extends BackgroundValidTypes>(
    type: Type,
    data: Data[Type]
): Promise<Res[Type]> {
    const res = (await browser.runtime.sendMessage(undefined, { type, data })) as Res[Type];
    return res;
}
