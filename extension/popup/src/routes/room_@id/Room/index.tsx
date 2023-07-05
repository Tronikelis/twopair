import { Box, Button, Paper, Stack, Text, Title } from "@mantine/core";
import { useAtom } from "jotai";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { sendToContent } from "~/comms";
import useEffectAsync from "~/popup/hooks/useEffectAsync";
import useFnRef from "~/popup/hooks/useFnRef";
import useInterval from "~/popup/hooks/useInterval";
import useUser from "~/popup/hooks/useUser";

import { roomAtom } from "../store";

export default function Room() {
    const navigate = useNavigate();
    const { id: roomId } = useParams();

    const [room, setRoom] = useAtom(roomAtom);

    const user = useUser();

    const getRoom = useFnRef(async () => {
        if (!roomId) return;
        const { room } = await sendToContent("GET_ROOM", { roomId });
        setRoom(room);
    });

    useInterval(getRoom, 1e3);
    useEffectAsync(getRoom, []);

    async function onLeaveRoom() {
        if (!user || !roomId) return;
        await sendToContent("LEAVE_ROOM", { roomId, userId: user.id });
        navigate("/");
    }

    return (
        <Stack>
            <Box>
                <Title order={5}>Room</Title>
                <Text>{roomId}</Text>
                {room?.websiteUrl && <Text>{room.websiteUrl}</Text>}
            </Box>

            <Button onClick={onLeaveRoom} variant="light" color="red">
                Leave
            </Button>

            <Paper p="xs" withBorder>
                {room && (
                    <Stack spacing="xs">
                        <Text>People: {room.users.map(x => x.username).join(", ")}</Text>

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
            </Paper>
        </Stack>
    );
}
