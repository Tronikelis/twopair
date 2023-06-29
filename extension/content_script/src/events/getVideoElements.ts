import { nanoid } from "nanoid";

import { GetVideoElementsRes } from "~/comms";

import { VIDEO_ATTR_ID } from "../config/const";

import { syncingVideoId } from "./setSyncingVideo";

export default function getVideoElements(): GetVideoElementsRes {
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
    }

    return {
        videos: videos.map(video => ({
            id: video.getAttribute(VIDEO_ATTR_ID) as string,
            src: video.src,
            playing: !video.paused,
            time: video.currentTime,
            syncing: video.getAttribute(VIDEO_ATTR_ID) === syncingVideoId,
        })),
    };
}
