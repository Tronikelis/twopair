import { Box, Paper, Stack, Text, Title } from "@mantine/core";
import { JoinRoomServer } from "backend/src/types/socket.io";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { sendToContent } from "~/comms";
import { STORAGE_USER_ID, STORAGE_USERNAME } from "~/popup/config/const";
import useEffectAsync from "~/popup/hooks/useEffectAsync";
import useFnRef from "~/popup/hooks/useFnRef";
import useInterval from "~/popup/hooks/useInterval";
import useStorage from "~/popup/hooks/useStorage";

export default function Room() {
    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [room, setRoom] = useState<JoinRoomServer["room"] | undefined>(undefined);

    const [userId] = useStorage(STORAGE_USER_ID, "");
    const [username] = useStorage(STORAGE_USERNAME, "");

    const joinRoom = useFnRef(async () => {
        if (!id || !userId) return;

        const { room } = await sendToContent("JOIN_ROOM", {
            id,
            user: {
                id: userId,
                username,
            },
        });

        setLoading(false);
        setRoom(room);
    });

    useEffectAsync(joinRoom, [id, userId]);
    useInterval(joinRoom, 1e3);

    return (
        <Stack>
            <Box>
                <Title order={5}>Room {loading ? ", loading..." : ""}</Title>
                <Text>{id}</Text>
            </Box>

            <Paper p="xs" withBorder>
                {room && (
                    <Stack spacing="xs">
                        <Text>People: {room.users.map(x => x.username).join(", ")}</Text>

                        <Text>
                            <Text span weight={600}>
                                Last sync:{" "}
                            </Text>
                            <Text span>
                                {room.playing ? "Played" : "Paused"} at {room.time}s
                            </Text>
                        </Text>
                    </Stack>
                )}
            </Paper>
        </Stack>
    );
}
