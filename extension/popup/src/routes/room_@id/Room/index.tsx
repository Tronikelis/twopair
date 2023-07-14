import { Box, List, Paper, Stack, Text, Title } from "@mantine/core";
import { useAtom } from "jotai";
import React from "react";
import { useParams } from "react-router-dom";

import { sendToBg } from "~/comms";
import useEffectAsync from "~/popup/hooks/useEffectAsync";
import useFnRef from "~/popup/hooks/useFnRef";
import useInterval from "~/popup/hooks/useInterval";
import useUser from "~/popup/hooks/useUser";

import { roomAtom } from "../store";

export default function Room() {
    const { id: roomId } = useParams();

    const [room, setRoom] = useAtom(roomAtom);
    const user = useUser();

    const getRoom = useFnRef(async () => {
        if (!roomId) return;
        const { room } = await sendToBg("GET_ROOM", { roomId });
        setRoom(room);
    });

    useInterval(getRoom, 1e3);
    useEffectAsync(getRoom, []);

    return (
        <Stack>
            <Box>
                <Title order={5}>Room</Title>
                <Text>{roomId}</Text>
            </Box>

            <Paper p="xs" withBorder>
                {room && (
                    <Stack spacing="xs">
                        <Stack spacing={0}>
                            <Text>People:</Text>
                            <List>
                                {room.users.map(x => (
                                    <List.Item key={x.id}>
                                        {x.username}
                                        {x.id === user?.id && " 👤"}
                                        {x.id === room.ownerId && " 👑"}
                                    </List.Item>
                                ))}
                            </List>
                        </Stack>

                        <Text>
                            <Text span weight={600}>
                                Last sync:{" "}
                            </Text>
                            <Text span>
                                {room.playing ? "Played" : "Paused"} at {Math.floor(room.time)}
                                s
                            </Text>
                        </Text>
                    </Stack>
                )}

                {!room && <Text>This room does not exist 🤔</Text>}
            </Paper>
        </Stack>
    );
}
