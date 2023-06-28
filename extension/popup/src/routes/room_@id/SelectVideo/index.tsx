import React, { useEffect, useState } from "react";
import { Box, Button, Paper, Stack, Text, Title } from "@mantine/core";
import useEffectAsync from "~/popup/hooks/useEffectAsync";
import { sendToContent, GetVideoElementsRes } from "~/comms";
import useInterval from "~/popup/hooks/useInterval";
import useFnRef from "~/popup/hooks/useFnRef";
import useStorage from "~/popup/hooks/useStorage";
import { STORAGE_USER_ID } from "~/popup/config/const";
import { useParams } from "react-router-dom";

export default function SelectVideo() {
    const { id: roomId } = useParams();

    const [loading, setLoading] = useState(true);
    const [videosFound, setVideosFound] = useState<
        GetVideoElementsRes["videos"]
    >([]);

    const [userId] = useStorage(STORAGE_USER_ID, "");

    const getVideoElements = useFnRef(async () => {
        const { videos } = await sendToContent("GET_VIDEO_ELEMENTS", undefined);
        setLoading(false);
        setVideosFound(videos);
    });

    useEffectAsync(getVideoElements, []);
    useInterval(getVideoElements, 1e3);

    async function onSyncVideo(videoId: string) {
        if (!roomId || !userId) return;
        await sendToContent("SET_SYNCING_VIDEO", { videoId });
        await sendToContent("SYNC_ROOM", { fromUserId: userId, roomId });
    }

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
                            {playing ? "⏩ Playing" : "⏸️ Paused"} at{" "}
                            {Math.floor(time)}s
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

                        <Button size="sm" onClick={() => onSyncVideo(id)}>
                            Sync
                        </Button>
                    </Stack>
                </Paper>
            ))}
        </Stack>
    );
}
