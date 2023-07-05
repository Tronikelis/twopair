import { Box, Button, Paper, Stack, Text, Title } from "@mantine/core";
import React from "react";
import { useParams } from "react-router-dom";

import { sendToContent } from "~/comms";
import useGetVideoElements from "~/popup/hooks/useGetVideoElements";

export default function SelectVideo() {
    const { id: roomId } = useParams();

    const elements = useGetVideoElements();

    async function onSyncVideo(videoId: string) {
        if (!roomId) return;
        await sendToContent("SYNC_VIDEO", {
            videoId,
            roomId,
        });
    }

    return (
        <Stack>
            <Box>
                <Title order={5}>Select Video</Title>
                <Text>{elements?.videos.length} videos found</Text>
            </Box>

            {elements?.videos.map(({ id, playing, time }) => (
                <Paper withBorder p="xs" key={id}>
                    <Stack spacing="xs">
                        <Text>
                            {playing ? "⏩ Playing" : "⏸️ Paused"} at {Math.floor(time)}s
                        </Text>

                        <Button
                            size="sm"
                            onClick={() => onSyncVideo(id)}
                            disabled={elements.syncingId === id}
                        >
                            Sync
                        </Button>
                    </Stack>
                </Paper>
            ))}
        </Stack>
    );
}
