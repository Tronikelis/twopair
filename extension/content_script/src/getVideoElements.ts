import { GetVideoElementsRes } from "~/comms";
import { nanoid } from "nanoid";

const ATTRIBUTE_ID = "__wat-id";

export default function getVideoElements(): GetVideoElementsRes {
    const videos = Array.from(document.querySelectorAll("video")).filter(
        x => x.src
    );

    // for (const item of Array.from(document.querySelectorAll("iframe"))) {
    //     const x = Array.from(
    //         item.contentDocument?.body.querySelectorAll("video") || []
    //     );

    //     for (const video of x) {
    //         videos.push(video);
    //     }
    // }

    for (const video of videos) {
        if (!video.getAttribute(ATTRIBUTE_ID)) {
            video.setAttribute(ATTRIBUTE_ID, nanoid(4));
        }
    }

    return {
        videos: videos.map(video => ({
            id: video.getAttribute(ATTRIBUTE_ID) as string,
            src: video.src,
            playing: !video.paused,
            time: Math.floor(video.currentTime),
        })),
    };
}
