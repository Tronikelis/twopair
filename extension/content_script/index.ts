import browser from "webextension-polyfill";
import { GetVideoElementsRes, listenFromContent } from "../utils/comms";

listenFromContent(async (type, data, sendResponse) => {
    switch (type) {
        case "GET_VIDEO_ELEMENTS":
            sendResponse({ foo: "bar" } as GetVideoElementsRes);
    }
});
