import { Box, Button, Group, Stack, Text, Title } from "@mantine/core";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import urlbat from "urlbat";
import browser from "webextension-polyfill";

import { sendToBg } from "~/comms";
import ExternalLink from "~/popup/components/ExternalLink";
import LeaveRoomBnt from "~/popup/components/LeaveRoomBtn";
import { STORAGE_LAST_ROOM_ID } from "~/popup/config/const";
import useEffectAsync from "~/popup/hooks/useEffectAsync";
import useFnRef from "~/popup/hooks/useFnRef";
import useStorage from "~/popup/hooks/useStorage";
import useUser from "~/popup/hooks/useUser";
import notify from "~/popup/utils/notify";

let navigated = false;

export default function Idx() {
    const navigate = useNavigate();

    const user = useUser();
    const [lastRoomId] = useStorage(STORAGE_LAST_ROOM_ID, "");

    const onLastRoom = useFnRef(async () => {
        if (!user || !lastRoomId) return;

        const data = await sendToBg("JOIN_ROOM", { roomId: lastRoomId, user });
        if (!data.room) {
            notify.err({ message: "Room does not exist" });
            return;
        }

        navigate(urlbat("/room/:id", { id: lastRoomId }));
    });

    // automatically go back to last room on popup open
    useEffectAsync(async () => {
        if (navigated || !lastRoomId || !user) return;
        navigated = true;

        await onLastRoom();
    }, [lastRoomId, user, onLastRoom]);

    async function onNewRoom() {
        if (!user) return;

        const data = await sendToBg("CREATE_ROOM", { user });
        const url = urlbat("/room/:id", { id: data.room.id });
        await browser.storage.local.set({ [STORAGE_LAST_ROOM_ID]: data.room.id });

        navigated = true;
        navigate(url);
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

                <Button onClick={onNewRoom} disabled={!user || user.syncing}>
                    New room
                </Button>

                <Button to="/room/join" component={Link} disabled={!user || user.syncing}>
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
