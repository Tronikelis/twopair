import { Box, Button, Paper, Stack, Text, Title } from "@mantine/core";
import { useSetAtom } from "jotai";
import React from "react";
import { useParams } from "react-router-dom";

import { sendToContent } from "~/comms";
import { STORAGE_USER_ID, STORAGE_USERNAME } from "~/popup/config/const";
import useGetVideoElements from "~/popup/hooks/useGetVideoElements";
import useStorage from "~/popup/hooks/useStorage";

import { roomAtom } from "../store";

export default function SelectVideo() {
    const { id: roomId } = useParams();

    const setRoom = useSetAtom(roomAtom);

    const { videos, isSyncing } = useGetVideoElements();

    const [userId] = useStorage(STORAGE_USER_ID, "");
    const [username] = useStorage(STORAGE_USERNAME, "");

    async function onSyncVideo(videoId: string) {
        if (!roomId || !userId || !username) return;

        const room = await sendToContent("SET_SYNCING_VIDEO", {
            roomId,
            videoId,
            user: {
                id: userId,
                username,
            },
        });

        setRoom(room.room);
    }

    async function onUnsyncVideo() {
        await sendToContent("UNSYNC_VIDEO", undefined);
    }

    return (
        <Stack>
            <Box>
                <Title order={5}>Select Video</Title>
                <Text>{videos.length} videos found</Text>
            </Box>

            <Button variant="light" color="red" onClick={onUnsyncVideo} disabled={!isSyncing}>
                Unsync
            </Button>

            {videos.map(({ id, playing, time }) => (
                <Paper withBorder p="xs" key={id}>
                    <Stack spacing="xs">
                        <Text>
                            {playing ? "⏩ Playing" : "⏸️ Paused"} at {Math.floor(time)}s
                        </Text>

                        <Button size="sm" onClick={() => onSyncVideo(id)} disabled={isSyncing}>
                            Sync
                        </Button>
                    </Stack>
                </Paper>
            ))}
        </Stack>
    );
}
