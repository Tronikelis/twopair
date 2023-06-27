import { GetVideoElementsRes } from "~/comms";

const ATTRIBUTE_ID = "__wat-id";

function genId(): string {
    return Math.random().toString().split(".").at(-1) as string;
}

export default function getVideoElements(): GetVideoElementsRes {
    const videos = Array.from(document.querySelectorAll("video")).filter(
        x => x.src
    );

    for (const video of videos) {
        if (!video.getAttribute(ATTRIBUTE_ID)) {
            video.setAttribute(ATTRIBUTE_ID, genId());
        }
    }

    return {
        videos: videos.map(video => ({
            id: video.getAttribute(ATTRIBUTE_ID) as string,
            src: video.src,
        })),
    };
}
