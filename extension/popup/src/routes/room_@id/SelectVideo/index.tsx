import React, { useEffect, useState } from "react";
import { Button, Paper, Stack, Text, Title } from "@mantine/core";
import useEffectAsync from "~/popup/hooks/useEffectAsync";
import { sendToContent, GetVideoElementsRes } from "~/comms";

export default function SelectVideo() {
    const [videosFound, setVideosFound] = useState<
        GetVideoElementsRes["videos"]
    >([]);

    useEffectAsync(async () => {
        const { videos } = await sendToContent("GET_VIDEO_ELEMENTS", undefined);
        setVideosFound(videos);
    }, []);

    return (
        <Stack>
            <Title order={5}>Select Video</Title>

            {videosFound.map(video => (
                <Paper withBorder p="xs" key={video.id}>
                    <Stack>
                        <Text>ID: {video.id}</Text>
                        <Text>SRC: {video.src}</Text>

                        <Button ml="auto" size="sm">
                            Sync
                        </Button>
                    </Stack>
                </Paper>
            ))}
        </Stack>
    );
}
