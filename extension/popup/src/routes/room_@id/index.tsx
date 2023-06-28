import { Box, Group, Stack, Text, Title } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import browser from "webextension-polyfill";
import GoBack from "~/popup/components/GoBack";
import { STORAGE_USERNAME, STORAGE_USER_ID } from "~/popup/config/const";

import { JOIN_ROOM } from "backend/src/config/events";
import {
    JoinRoomClient,
    JoinRoomServer,
    Room,
} from "backend/src/types/socket.io";
import useStorage from "~/popup/hooks/useStorage";
import { GetVideoElementsRes, sendToContent } from "~/comms";

export default function RoomId() {
    const { id } = useParams();

    const [userId] = useStorage(STORAGE_USER_ID, "");
    const [username] = useStorage(STORAGE_USERNAME, "unknown");

    const [room, setRoom] = useState<Room | undefined>(undefined);
    const [videos, setVideos] = useState<GetVideoElementsRes["videos"]>([]);

    useEffect(() => {
        if (!id || !userId || !username) return;

        (async () => {
            const { room } = await sendToContent("JOIN_ROOM", {
                id,
                user: {
                    id: userId,
                    username,
                },
            });

            setRoom(room);
        })();
    }, [id, userId, username]);

    // get videos
    useEffect(() => {
        (async () => {
            const videos = await sendToContent("GET_VIDEO_ELEMENTS", undefined);
            setVideos(videos.videos);
        })();
    }, []);

    return (
        <Stack>
            <Group>
                <GoBack />
                <Title order={3}>Room id: {id}</Title>
            </Group>

            <Group>
                <Stack>
                    {videos && <Text>videos found: {videos.length}</Text>}

                    {videos &&
                        videos.map(x => (
                            <Box>
                                <Text>id: {x.id}</Text>
                                <Text>src: {x.src}</Text>
                            </Box>
                        ))}
                </Stack>

                <Stack>
                    <Text>Room: {room ? "OK ✅" : "Loading..."}</Text>
                    {room && (
                        <Text component="pre">
                            {JSON.stringify(room, null, 2)}
                        </Text>
                    )}
                </Stack>
            </Group>
        </Stack>
    );
}
