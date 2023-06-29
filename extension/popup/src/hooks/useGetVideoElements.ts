import { useMemo, useState } from "react";

import { GetVideoElementsRes, sendToContent } from "~/comms";

import useEffectAsync from "./useEffectAsync";
import useFnRef from "./useFnRef";
import useInterval from "./useInterval";

export default function useGetVideoElements() {
    const [videos, setVideos] = useState<GetVideoElementsRes["videos"]>([]);

    const getVideoElements = useFnRef(async () => {
        const { videos } = await sendToContent("GET_VIDEO_ELEMENTS", undefined);
        setVideos(videos);
    });

    useEffectAsync(getVideoElements, []);
    useInterval(getVideoElements, 1e3);

    const isSyncing = useMemo(() => {
        return !!videos.find(x => x.syncing);
    }, [videos]);

    return {
        videos,
        isSyncing,
    };
}
