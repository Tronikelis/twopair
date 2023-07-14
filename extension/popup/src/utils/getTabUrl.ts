import browser from "webextension-polyfill";

/** this function currently returns an empty string if we can't get an url from the active tab */
export default async function getTabUrl(): Promise<string> {
    const [currentTab] = await browser.tabs.query({ active: true, currentWindow: true });
    if (!currentTab) {
        // maybe throw here but I have not setup proper err handling yet
        return "";
    }

    return currentTab.url as string;
}
