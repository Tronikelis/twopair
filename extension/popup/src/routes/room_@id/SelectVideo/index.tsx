import { Box, Button, Paper, Stack, Text, Title } from "@mantine/core";
import { useSetAtom } from "jotai";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { sendToContent } from "~/comms";
import { STORAGE_USER_ID, STORAGE_USERNAME } from "~/popup/config/const";
import useGetVideoElements from "~/popup/hooks/useGetVideoElements";
import useStorage from "~/popup/hooks/useStorage";

import { roomAtom } from "../store";

export default function SelectVideo() {
    const { id: roomId } = useParams();
    const navigate = useNavigate();

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
        navigate("/", { replace: true });
    }

    return (
        <Stack>
            <Box>
                <Title order={5}>Select Video</Title>
                <Text>{videos.length} videos found</Text>
            </Box>

            {isSyncing && (
                <Button variant="light" color="red" onClick={onUnsyncVideo}>
                    Unsync
                </Button>
            )}

            {videos.map(({ id, playing, src, time }) => (
                <Paper withBorder p="xs" key={id}>
                    <Stack spacing="xs">
                        <Text>
                            {playing ? "⏩ Playing" : "⏸️ Paused"} at {Math.floor(time)}s
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

                        <Button size="sm" onClick={() => onSyncVideo(id)} disabled={isSyncing}>
                            Sync
                        </Button>
                    </Stack>
                </Paper>
            ))}
        </Stack>
    );
}
