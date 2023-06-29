import { Box, Button, Paper, Stack, Text, Title } from "@mantine/core";
import { useSetAtom } from "jotai";
import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { GetVideoElementsRes, sendToContent } from "~/comms";
import { STORAGE_USER_ID, STORAGE_USERNAME } from "~/popup/config/const";
import useEffectAsync from "~/popup/hooks/useEffectAsync";
import useFnRef from "~/popup/hooks/useFnRef";
import useInterval from "~/popup/hooks/useInterval";
import useStorage from "~/popup/hooks/useStorage";

import { roomAtom } from "../store";

export default function SelectVideo() {
    const { id: roomId } = useParams();
    const navigate = useNavigate();

    const setRoom = useSetAtom(roomAtom);

    const [videosFound, setVideosFound] = useState<GetVideoElementsRes["videos"]>([]);

    const [userId] = useStorage(STORAGE_USER_ID, "");
    const [username] = useStorage(STORAGE_USERNAME, "");

    const getVideoElements = useFnRef(async () => {
        const { videos } = await sendToContent("GET_VIDEO_ELEMENTS", undefined);
        setVideosFound(videos);
    });

    useEffectAsync(getVideoElements, []);
    useInterval(getVideoElements, 1e3);

    const isSyncing = useMemo(() => {
        return !!videosFound.find(x => x.syncing);
    }, [videosFound]);

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
                <Text>{videosFound.length} videos found</Text>
            </Box>

            {isSyncing && (
                <Button variant="light" color="red" onClick={onUnsyncVideo}>
                    Unsync
                </Button>
            )}

            {videosFound.map(({ id, playing, src, time }) => (
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
