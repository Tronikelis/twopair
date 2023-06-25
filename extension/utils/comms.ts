import browser from "webextension-polyfill";

export type MessageType = "GET_VIDEO_ELEMENTS" | "START_SYNC_VIDEO";

export type GetVideoElementsData = undefined;

export type GetVideoElementsRes = {
    videos: {
        id: string;
        src: string;
    }[];
};

export type StartSyncVideoData = {
    bar: "foo";
};

export type StartSyncVideoRes = {
    bar: "foo";
};

export type Data = {
    GET_VIDEO_ELEMENTS: GetVideoElementsData;
    START_SYNC_VIDEO: StartSyncVideoData;
};

export type Res = {
    GET_VIDEO_ELEMENTS: GetVideoElementsRes;
    START_SYNC_VIDEO: StartSyncVideoRes;
};

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
    cb: (
        type: Type,
        data: Data[Type],
        sendResponse: (data: Res[Type]) => void
    ) => void
) {
    browser.runtime.onMessage.addListener(
        ({ type, data }, _sender, sendResponse) => {
            cb(type, data, sendResponse);
        }
    );
}
