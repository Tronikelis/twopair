import { Box, Button, Group, Stack, Text, Title } from "@mantine/core";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import urlbat from "urlbat";
import browser from "webextension-polyfill";

import { sendToContent } from "~/comms";
import { STORAGE_LAST_ROOM_ID } from "~/popup/config/const";
import useGetVideoElements from "~/popup/hooks/useGetVideoElements";
import useStorage from "~/popup/hooks/useStorage";
import useUser from "~/popup/hooks/useUser";
import notify, { showInjectScriptErr } from "~/popup/utils/notify";
import tryCatch from "~/utils/tryCatch";

export default function Idx() {
    const navigate = useNavigate();

    const user = useUser();
    const [lastRoomId] = useStorage(STORAGE_LAST_ROOM_ID, "");

    const elements = useGetVideoElements();

    async function onLeaveRoom() {
        if (!user || !lastRoomId) return;
        await sendToContent("LEAVE_ROOM", { roomId: lastRoomId, userId: user.id });
    }

    async function onNewRoom() {
        if (!user) return;

        const [err, data] = await tryCatch(() => sendToContent("CREATE_ROOM", { user }));
        if (err) {
            showInjectScriptErr();
            return;
        }

        const url = urlbat("/room/:id", { id: data.room.id });
        await browser.storage.local.set({ [STORAGE_LAST_ROOM_ID]: data.room.id });
        navigate(url);
    }

    async function onLastRoom() {
        if (!user || !lastRoomId) return;

        const [err, data] = await tryCatch(() =>
            sendToContent("JOIN_ROOM", { roomId: lastRoomId, user })
        );
        if (err) {
            showInjectScriptErr();
            return;
        }

        if (!data.room) {
            notify.err({ message: "Room does not exist" });
            return;
        }

        navigate(urlbat("/room/:id", { id: lastRoomId }));
    }

    return (
        <Stack spacing="xl" justify="center" sx={{ flex: 1 }}>
            <Box>
                <Title order={3} align="center">
                    Twopair
                </Title>
                <Text color="dimmed" align="center">
                    Watch any* video on the internet with your friends
                </Text>
            </Box>

            <Text align="center">Welcome {user?.username}</Text>

            <Group sx={{ justifyContent: "center" }}>
                {lastRoomId && (
                    <Button variant="outline" onClick={onLastRoom}>
                        Last room
                    </Button>
                )}

                <Button onClick={onNewRoom} disabled={!!elements?.syncingId}>
                    New room
                </Button>

                <Button to="/room/join" component={Link} disabled={!!elements?.syncingId}>
                    Join room
                </Button>
            </Group>

            <Group ml="auto">
                <Button
                    variant="light"
                    color="red"
                    onClick={onLeaveRoom}
                    disabled={!elements?.syncingId}
                >
                    Leave
                </Button>

                <Button to="/settings" color="gray" component={Link}>
                    Settings
                </Button>
            </Group>
        </Stack>
    );
}
