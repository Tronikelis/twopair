import browser from "webextension-polyfill";
import type { MessageType, Data, Res } from "./types";

export type * from "./types";

export async function sendToContent<Type extends MessageType>(
    type: Type,
    data: Data[Type]
): Promise<Res[Type]> {
    const tabs = await browser.tabs.query({
        currentWindow: true,
        active: true,
    });

    const tab = tabs[0];
    if (!tab?.id) throw new Error("did not found active tab");

    const res = await browser.tabs.sendMessage(tab.id, { type, data });
    return res;
}

export function listenFromContent<Type extends MessageType>(
    cb: (type: Type, data: Data[Type]) => Promise<Res[Type]>
) {
    browser.runtime.onMessage.addListener(async ({ type, data }, _sender) => {
        // Rather than receiving a sendResponse callback to send a response,
        // onMessage listeners simply return a Promise whose resolution value is used as a reply.
        return await cb(type, data);
    });
}
