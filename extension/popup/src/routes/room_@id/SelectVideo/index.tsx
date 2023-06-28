import React, { useEffect, useState } from "react";
import { Box, Button, Paper, Stack, Text, Title } from "@mantine/core";
import useEffectAsync from "~/popup/hooks/useEffectAsync";
import { sendToContent, GetVideoElementsRes } from "~/comms";
import useInterval from "~/popup/hooks/useInterval";
import useFnRef from "~/popup/hooks/useFnRef";

export default function SelectVideo() {
    const [loading, setLoading] = useState(true);

    const [videosFound, setVideosFound] = useState<
        GetVideoElementsRes["videos"]
    >([]);

    const getVideoElements = useFnRef(async () => {
        const { videos } = await sendToContent("GET_VIDEO_ELEMENTS", undefined);
        setLoading(false);
        setVideosFound(videos);
    });

    useEffectAsync(getVideoElements, []);
    useInterval(getVideoElements, 1e3);

    return (
        <Stack>
            <Box>
                <Title order={5}>
                    Select Video{loading ? ", loading..." : ""}
                </Title>
                <Text>{videosFound.length} videos found</Text>
            </Box>

            {videosFound.map(({ id, playing, src, time }) => (
                <Paper withBorder p="xs" key={id}>
                    <Stack spacing="xs">
                        <Text>
                            {playing ? "⏩ Playing" : "⏸️ Paused"} at {time}s
                        </Text>

                        <Text>
                            <Text span weight={600}>
                                id:
                            </Text>
                            <Text span> {id}</Text>
                        </Text>

                        <Text>
                            <Text span weight={600}>
                                src:
                            </Text>
                            <Text span> {src}</Text>
                        </Text>

                        <Button size="sm">Sync</Button>
                    </Stack>
                </Paper>
            ))}
        </Stack>
    );
}
