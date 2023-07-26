import { Box, Button, Group, List, Paper, Stack, Text, Title } from "@mantine/core";
import { useAtom } from "jotai";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { sendToBg } from "~/comms";
import useEffectAsync from "~/popup/hooks/useEffectAsync";
import useFnRef from "~/popup/hooks/useFnRef";
import useInterval from "~/popup/hooks/useInterval";
import useUser from "~/popup/hooks/useUser";
import notify from "~/popup/utils/notify";
import tryCatch from "~/utils/tryCatch";

import { roomAtom } from "../store";

const legend = {
    me: "[me]",
    owner: "", // this does not have any impact currently
    syncing: {
        true: "✅",
        false: "💤",
    },
};

export default function Room() {
    const { id: roomId } = useParams();

    const [buttonMessage, setButtonMessage] = useState("Copy");

    const [room, setRoom] = useAtom(roomAtom);
    const user = useUser();

    const getRoom = useFnRef(async () => {
        if (!roomId) return;
        const { room } = await sendToBg("GET_ROOM", { roomId });
        setRoom(room);
    });

    useInterval(getRoom, 1e3);
    useEffectAsync(getRoom, []);

    async function onCopyRoomId() {
        if (!roomId) return;

        const [err] = await tryCatch(() => navigator.clipboard.writeText(roomId));
        if (err) {
            notify.err({ message: "Can't copy" });
            return;
        }

        setButtonMessage("Copied");
    }

    return (
        <Stack>
            <Box>
                <Title order={5}>Room</Title>
                <Group spacing="xs">
                    <Text>{roomId}</Text>
                    <Button size="xs" variant="outline" onClick={onCopyRoomId}>
                        {buttonMessage}
                    </Button>
                </Group>
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
                                        {x.id === user?.id && ` ${legend.me}`}
                                        {x.id === room.ownerId && ` ${legend.owner}`}
                                        {x.syncing
                                            ? ` ${legend.syncing.true}`
                                            : ` ${legend.syncing.false}`}
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
