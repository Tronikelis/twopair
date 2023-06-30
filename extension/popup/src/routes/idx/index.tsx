import { Button, Group, Stack, Text, Title } from "@mantine/core";
import { nanoid } from "nanoid";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import urlbat from "urlbat";
import browser from "webextension-polyfill";

import { sendToContent } from "~/comms";
import { ROOM_ID_LEN, STORAGE_LAST_ROOM_ID, STORAGE_USERNAME } from "~/popup/config/const";
import useGetVideoElements from "~/popup/hooks/useGetVideoElements";
import useStorage from "~/popup/hooks/useStorage";

export default function Idx() {
    const navigate = useNavigate();

    const [username] = useStorage(STORAGE_USERNAME, "");
    const [lastRoomId] = useStorage(STORAGE_LAST_ROOM_ID, "");

    const { isSyncing } = useGetVideoElements();

    async function onUnsync() {
        await sendToContent("UNSYNC_VIDEO", undefined);
    }

    async function onNewRoom() {
        const id = nanoid(ROOM_ID_LEN);

        const url = urlbat("/room/:id", { id });
        await browser.storage.local.set({ [STORAGE_LAST_ROOM_ID]: id });
        navigate(url);
    }

    return (
        <Stack spacing="xl" justify="center" sx={{ flex: 1 }}>
            <Title order={3} align="center">
                WAT - Watch Anything Together
            </Title>

            <Text align="center">Welcome {username}</Text>

            <Group sx={{ justifyContent: "center" }}>
                {lastRoomId && (
                    <Button
                        variant="outline"
                        to={urlbat("/room/:id", { id: lastRoomId })}
                        component={Link}
                    >
                        Last room
                    </Button>
                )}

                <Button onClick={onNewRoom}>New room</Button>

                <Button to="/room/join" component={Link}>
                    Join room
                </Button>
            </Group>

            <Group ml="auto">
                <Button variant="light" color="red" onClick={onUnsync} disabled={!isSyncing}>
                    Unsync
                </Button>

                <Button to="/settings" color="gray" component={Link}>
                    Settings
                </Button>
            </Group>
        </Stack>
    );
}
