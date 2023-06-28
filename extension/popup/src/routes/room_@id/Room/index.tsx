import { Box, Paper, Stack, Text, Title } from "@mantine/core";
import { JoinRoomServer } from "backend/src/types/socket.io";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { sendToContent } from "~/comms";
import { STORAGE_USERNAME, STORAGE_USER_ID } from "~/popup/config/const";
import useEffectAsync from "~/popup/hooks/useEffectAsync";
import useStorage from "~/popup/hooks/useStorage";

export default function Room() {
    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [room, setRoom] = useState<JoinRoomServer["room"] | undefined>(
        undefined
    );

    const [userId] = useStorage(STORAGE_USER_ID, "");
    const [username] = useStorage(STORAGE_USERNAME, "");

    useEffectAsync(async () => {
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
    }, [id, userId]);

    return (
        <Stack>
            <Title order={5}>Room {loading ? ", loading..." : ""}</Title>

            <Paper p="xs" withBorder>
                <Stack spacing="xs">
                    {room && (
                        <>
                            <Text>
                                People:{" "}
                                {room.users.map(x => x.username).join(", ")}
                            </Text>

                            <Text>
                                {room.playing ? "Playing" : "Paused"} at{" "}
                                {room.time}s
                            </Text>
                        </>
                    )}
                </Stack>
            </Paper>
        </Stack>
    );
}
