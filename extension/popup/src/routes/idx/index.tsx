import { Button, Group, Stack, Text, Title } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";

import { sendToContent } from "~/comms";
import { STORAGE_USERNAME } from "~/popup/config/const";
import useGetVideoElements from "~/popup/hooks/useGetVideoElements";
import useStorage from "~/popup/hooks/useStorage";

export default function Idx() {
    const [username] = useStorage(STORAGE_USERNAME, "");

    const { isSyncing } = useGetVideoElements();

    async function onUnsync() {
        await sendToContent("UNSYNC_VIDEO", undefined);
    }

    return (
        <Stack spacing="xl" justify="center" sx={{ flex: 1 }}>
            <Title order={3} align="center">
                WAT - Watch Anything Together
            </Title>

            <Text align="center">Welcome {username}</Text>

            <Group sx={{ justifyContent: "center" }}>
                <Button to="/room/own" component={Link}>
                    My room
                </Button>
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
