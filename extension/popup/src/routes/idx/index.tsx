import { Box, Button, Group, Stack, Text, Title } from "@mantine/core";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import urlbat from "urlbat";
import browser from "webextension-polyfill";

import { sendToBg } from "~/comms";
import ExternalLink from "~/popup/components/ExternalLink";
import { STORAGE_LAST_ROOM_ID } from "~/popup/config/const";
import useGetSyncingStatus from "~/popup/hooks/useGetSyncingStatus";
import useStorage from "~/popup/hooks/useStorage";
import useUser from "~/popup/hooks/useUser";
import notify, { showInjectScriptErr } from "~/popup/utils/notify";
import tryCatch from "~/utils/tryCatch";

export default function Idx() {
    const navigate = useNavigate();

    const user = useUser();
    const [lastRoomId] = useStorage(STORAGE_LAST_ROOM_ID, "");

    const status = useGetSyncingStatus();

    async function onLeaveRoom() {
        if (!user || !lastRoomId) return;
        await sendToBg("LEAVE_ROOM", { roomId: lastRoomId, userId: user.id });
    }

    async function onNewRoom() {
        if (!user) return;

        const [err, data] = await tryCatch(() => sendToBg("CREATE_ROOM", { user }));
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
            sendToBg("JOIN_ROOM", { roomId: lastRoomId, user })
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

                <Button onClick={onNewRoom} disabled={!status || status.syncing}>
                    New room
                </Button>

                <Button to="/room/join" component={Link} disabled={!status || status.syncing}>
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
                    <Button
                        variant="light"
                        color="red"
                        onClick={onLeaveRoom}
                        disabled={!status || !status?.syncing}
                    >
                        Leave
                    </Button>

                    <Button to="/settings" color="gray" component={Link}>
                        Settings
                    </Button>
                </Group>
            </Group>
        </Stack>
    );
}
