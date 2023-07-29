import browser from "webextension-polyfill";

import { GetFramesData, GetFramesRes } from "~/comms";

/** Gets the frames in the currently active tab */
export default async function getFrames(_input: GetFramesData): Promise<GetFramesRes> {
    // browser.tabs is unavailable in content scripts
    // that's why we have to do this back and forwards just to get all frames
    // uuuuggghhh
    const [tab] = await browser.tabs.query({ active: true });
    if (tab?.id === undefined) {
        console.error("active tab is undefined");
        return { frames: [] };
    }

    const frames = await browser.webNavigation.getAllFrames({ tabId: tab.id });
    return { frames: frames || [] };
}
