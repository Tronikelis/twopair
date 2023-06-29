import { Box, Paper, Stack, Text, Title } from "@mantine/core";
import { useAtom } from "jotai";
import React from "react";
import { useParams } from "react-router-dom";

import { roomAtom } from "../store";

export default function Room() {
    const { id } = useParams();

    const [room] = useAtom(roomAtom);

    return (
        <Stack>
            <Box>
                <Title order={5}>Room</Title>
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
