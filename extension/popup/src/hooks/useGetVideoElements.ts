import { useState } from "react";

import { GetVideoElementsRes, sendToBg } from "~/comms";

import useEffectAsync from "./useEffectAsync";
import useInterval from "./useInterval";

export default function useGetVideoElements() {
    const [response, setResponse] = useState<GetVideoElementsRes | undefined>(undefined);

    async function getVideoElements() {
        const response = await sendToBg("GET_VIDEO_ELEMENTS", undefined);
        setResponse(response);
    }

    useEffectAsync(getVideoElements, []);
    useInterval(getVideoElements, 1e3);

    return response;
}
