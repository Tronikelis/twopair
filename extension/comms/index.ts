import browser from "webextension-polyfill";

import type {
    BackgroundValidTypes,
    ContentResponse,
    ContentValidTypes,
    Data,
    MessageType,
    Res,
} from "./types";

export type * from "./types";

export type ListenCb = ({
    type,
    data,
}: {
    type: MessageType;
    data: Data[MessageType];
}) => Promise<Res[MessageType]>;

type SendToContentOptions = {
    tabId: number | undefined;
    frameId: number | undefined;
};

export async function sendToContent<Type extends ContentValidTypes>(
    type: Type,
    data: Data[Type],
    { frameId, tabId }: SendToContentOptions = { frameId: undefined, tabId: undefined }
): Promise<ContentResponse<Res[Type]>> {
    const tabs = await browser.tabs.query({
        currentWindow: true,
        active: true,
    });

    const tab = tabId !== undefined ? await browser.tabs.get(tabId) : tabs[0];
    if (!tab?.id) throw new Error("this tab does not have an id, throwing");

    const res = (await browser.tabs.sendMessage(
        tab.id,
        { type, data },
        // sending to the top frame "0" by default always !!!
        { frameId: frameId === undefined ? 0 : frameId }
    )) as Res[Type];

    return {
        data: res,
        tabId: tab.id,
    };
}

export async function sendToBg<Type extends BackgroundValidTypes>(
    type: Type,
    data: Data[Type]
): Promise<Res[Type]> {
    const res = (await browser.runtime.sendMessage(undefined, { type, data })) as Res[Type];
    return res;
}

/** Sends something to a specific content script in the current tab, use only from content_scripts !!! */
export async function proxyToFrame<Type extends ContentValidTypes>(
    frameId: number,
    type: Type,
    data: Data[Type]
): Promise<ContentResponse<Res[Type]>> {
    const res = (await sendToBg("_PROXY_TO_CONTENT", {
        frameId,
        type,
        data,
    })) as ContentResponse<Res[Type]>;

    console.log("CALLING proxyToFrame", { frameId, type, data });

    return res;
}
