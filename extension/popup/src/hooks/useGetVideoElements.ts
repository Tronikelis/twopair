import { useState } from "react";

import { GetVideoElementsRes, sendToContent } from "~/comms";

import useEffectAsync from "./useEffectAsync";
import useFnRef from "./useFnRef";
import useInterval from "./useInterval";

export default function useGetVideoElements() {
    const [response, setResponse] = useState<GetVideoElementsRes | undefined>(undefined);

    const getVideoElements = useFnRef(async () => {
        const response = await sendToContent("GET_VIDEO_ELEMENTS", undefined);
        setResponse(response);
    });

    useEffectAsync(getVideoElements, []);
    useInterval(getVideoElements, 1e3);

    return response;
}
