import browser from "webextension-polyfill";

import {
    GetVideoElementsRes,
    LeaveRoomData,
    ListenCb,
    OnVideoChangeData,
    proxyToFrame,
    sendToBg,
    SyncVideoData,
} from "~/comms";
import noop from "~/utils/noop";

import getVideoElements from "./events/getVideoElements";
import leaveRoom from "./events/leaveRoom";
import onVideoChange from "./events/onVideoChange";
import syncVideo from "./events/syncVideo";

// keep background script alive (this works?)
setInterval(async () => {
    await sendToBg("PING", undefined);
}, 500);

// eslint-disable-next-line @typescript-eslint/require-await
const onMessage: ListenCb = async ({ type, data }) => {
    const { frames: childFrames } = await sendToBg("GET_FRAMES", undefined).then(x => ({
        frames: x.frames.filter(x => x.frameId !== 0),
    }));

    console.log({ childFrames });

    // command & control
    if (window === window.top) {
        switch (type) {
            case "GET_VIDEO_ELEMENTS": {
                const elements = getVideoElements(undefined);

                const responses = await Promise.allSettled(
                    childFrames.map(x => proxyToFrame(x.frameId, type, undefined))
                );

                console.log({ responses });

                const videos = [...elements.videos];
                for (const x of responses) {
                    if (x.status === "rejected") continue;
                    videos.push(...x.value.data.videos);
                }

                return {
                    syncingId: elements.syncingId,
                    videos,
                } as GetVideoElementsRes;
            }

            case "SYNC_VIDEO": {
                await Promise.allSettled(
                    childFrames.map(x => proxyToFrame(x.frameId, type, data as SyncVideoData))
                );

                syncVideo(data as SyncVideoData);
                return;
            }

            case "ON_VIDEO_CHANGE": {
                await Promise.allSettled(
                    childFrames.map(x =>
                        proxyToFrame(x.frameId, type, data as OnVideoChangeData)
                    )
                );

                onVideoChange(data as OnVideoChangeData);
                return;
            }

            case "LEAVE_ROOM": {
                await Promise.allSettled(
                    childFrames.map(x => proxyToFrame(x.frameId, type, data as LeaveRoomData))
                );

                leaveRoom(data as LeaveRoomData);
                return;
            }

            default:
                throw new Error(`unknown type "${type}" in content script`);
        }
    }

    switch (type) {
        case "GET_VIDEO_ELEMENTS":
            return getVideoElements(undefined);

        case "SYNC_VIDEO":
            return syncVideo(data as SyncVideoData);

        case "ON_VIDEO_CHANGE":
            return onVideoChange(data as OnVideoChangeData);

        case "LEAVE_ROOM":
            return leaveRoom(data as LeaveRoomData);

        default:
            throw new Error(`unknown type "${type}" in content script`);
    }
};

// this HAS to be in global scope because chrome does not register it otherwise
browser.runtime.onMessage.addListener(onMessage);

window.addEventListener("beforeunload", () => {
    // https://stackoverflow.com/questions/17188058/using-onbeforeunload-without-dialog
    sendToBg("REPORT_SYNCING", { syncing: false }).catch(noop);
    return undefined;
});
