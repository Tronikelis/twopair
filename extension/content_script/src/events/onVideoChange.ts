import { OnVideoChangeData, OnVideoChangeRes } from "~/comms";
import withinMargin from "~/utils/withinMargin";

import { SYNC_MARGIN } from "../config/const";
import getSyncingVideo from "../utils/getSyncingVideo";

export default function onVideoChange(input: OnVideoChangeData): OnVideoChangeRes {
    const video = getSyncingVideo();
    if (!video) return;

    if (video.paused === input.playing) {
        input.playing ? void video.play() : video.pause();
    }

    if (!withinMargin(video.currentTime, input.time, SYNC_MARGIN)) {
        video.currentTime = input.time;
    }
}
