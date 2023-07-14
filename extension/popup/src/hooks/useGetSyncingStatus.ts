import { useState } from "react";

import { GetSyncingStatusRes, sendToBg } from "~/comms";

import useEffectAsync from "./useEffectAsync";
import useInterval from "./useInterval";

export default function useGetSyncingStatus(): GetSyncingStatusRes | undefined {
    const [response, setResponse] = useState<GetSyncingStatusRes | undefined>(undefined);

    async function getSyncingStatus() {
        const response = await sendToBg("GET_SYNCING_STATUS", undefined);
        setResponse(response);
    }

    useEffectAsync(getSyncingStatus, []);
    useInterval(getSyncingStatus, 1e3);

    return response;
}
