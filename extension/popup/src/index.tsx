import React, { useEffect, useState } from "react";
import { GetVideoElementsRes, sendToContent } from "~/utils/comms";
import tryCatch from "~/utils/tryCatch";
import { Stack, Text } from "@mantine/core";

function wait(ms = 1000): Promise<void> {
    return new Promise(res => {
        setTimeout(res, ms);
    });
}

export default function Main() {
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
        <Stack p="md">
            <Text>{videos?.videos.length} videos found on this website</Text>
            {videos?.videos && (
                <Text component="pre">
                    {JSON.stringify(videos.videos, null, 4)}
                </Text>
            )}

            {error && <Text component="pre">Error {error}</Text>}
        </Stack>
    );
}
