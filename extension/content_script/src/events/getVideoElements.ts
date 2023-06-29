import { nanoid } from "nanoid";

import { GetVideoElementsData, GetVideoElementsRes } from "~/comms";

import { VIDEO_ATTR_ID, VIDEO_ATTR_IS_SYNCING } from "../config/const";

export default function getVideoElements(_input: GetVideoElementsData): GetVideoElementsRes {
    const videos = Array.from(document.querySelectorAll("video")).filter(x => x.src);

    // https://bugs.chromium.org/p/chromium/issues/detail?id=344341
    // for (const item of Array.from(document.querySelectorAll("iframe"))) {
    //     const x = Array.from(
    //         item.contentDocument?.body.querySelectorAll("video") || []
    //     );

    //     for (const video of x) {
    //         videos.push(video);
    //     }
    // }

    for (const video of videos) {
        if (!video.getAttribute(VIDEO_ATTR_ID)) {
            video.setAttribute(VIDEO_ATTR_ID, nanoid(4));
        }
        if (!video.getAttribute(VIDEO_ATTR_IS_SYNCING)) {
            video.setAttribute(VIDEO_ATTR_IS_SYNCING, "false");
        }
    }

    return {
        videos: videos.map(video => ({
            id: video.getAttribute(VIDEO_ATTR_ID) as string,
            src: video.src,
            playing: !video.paused,
            time: video.currentTime,
            syncing: video.getAttribute(VIDEO_ATTR_IS_SYNCING) === "true",
        })),
    };
}
