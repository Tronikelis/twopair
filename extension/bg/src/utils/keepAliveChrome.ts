import browser from "webextension-polyfill";

import noop from "~/utils/noop";

browser.runtime.onStartup.addListener(keepAliveChrome);

/** https://stackoverflow.com/a/66618269/19505708 */
export default function keepAliveChrome() {
    setInterval(() => browser.runtime.getPlatformInfo().catch(noop), 20e3);
}
