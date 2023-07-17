import { Box, Button, Group, Stack, Text, Title } from "@mantine/core";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import urlbat from "urlbat";
import browser from "webextension-polyfill";

import { sendToBg } from "~/comms";
import ExternalLink from "~/popup/components/ExternalLink";
import LeaveRoomBnt from "~/popup/components/LeaveRoomBtn";
import { STORAGE_LAST_ROOM_ID } from "~/popup/config/const";
import useIsSyncing from "~/popup/hooks/useIsSyncing";
import useStorage from "~/popup/hooks/useStorage";
import useUser from "~/popup/hooks/useUser";
import notify from "~/popup/utils/notify";

let navigated = false;

export default function Idx() {
    const navigate = useNavigate();

    const user = useUser();
    const [lastRoomId] = useStorage(STORAGE_LAST_ROOM_ID, "");

    const syncing = useIsSyncing();

    useEffect(() => {
        if (navigated || !lastRoomId) return;
        navigated = true;

        navigate(urlbat("/room/:id", { id: lastRoomId }));
    }, [lastRoomId, navigate]);

    async function onNewRoom() {
        if (!user) return;

        const data = await sendToBg("CREATE_ROOM", { user });
        const url = urlbat("/room/:id", { id: data.room.id });
        await browser.storage.local.set({ [STORAGE_LAST_ROOM_ID]: data.room.id });

        navigated = true;
        navigate(url);
    }

    async function onLastRoom() {
        if (!user || !lastRoomId) return;

        const data = await sendToBg("JOIN_ROOM", { roomId: lastRoomId, user });
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

                <Button onClick={onNewRoom} disabled={syncing}>
                    New room
                </Button>

                <Button to="/room/join" component={Link} disabled={syncing}>
                    Join room
                </Button>
            </Group>

            <Group position="apart">
                <ExternalLink
                    color="dimmed"
                    href="https://github.com/Tronikelis/twopair#notes"
                >
                    {"*some won't work"}
                </ExternalLink>

                <Group>
                    <LeaveRoomBnt />

                    <Button to="/settings" color="gray" component={Link}>
                        Settings
                    </Button>
                </Group>
            </Group>
        </Stack>
    );
}
