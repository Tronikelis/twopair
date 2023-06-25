import React, { useEffect, useState } from "react";
import browser from "webextension-polyfill";
import { GetVideoElementsRes, sendToContent } from "../../utils/comms";
import tryCatch from "../../utils/tryCatch";

function wait(ms = 1000): Promise<void> {
    return new Promise(res => {
        setTimeout(res, ms);
    });
}

export default function App() {
    const [error, setError] = useState("");

    const [videos, setVideos] = useState<GetVideoElementsRes | undefined>(
        undefined
    );

    useEffect(() => {
        (async () => {
            // wait for content script to load
            await wait();

            const [err, data] = await tryCatch(() =>
                sendToContent("GET_VIDEO_ELEMENTS", undefined)
            );

            if (err) {
                setError(err.message);
                return;
            }

            setVideos(data);
        })();
    }, []);

    return (
        <div>
            <p>{videos?.videos.length} videos found on this website</p>
            {videos?.videos && (
                <pre>{JSON.stringify(videos.videos, null, 4)}</pre>
            )}

            {error && <p>Error {error}</p>}
        </div>
    );
}
