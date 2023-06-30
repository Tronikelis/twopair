import { Button, Group, Stack, TextInput, Title } from "@mantine/core";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import urlbat from "urlbat";
import browser from "webextension-polyfill";

import GoBack from "~/popup/components/GoBack";
import { ROOM_ID_LEN, STORAGE_LAST_ROOM_ID } from "~/popup/config/const";

export default function RoomJoin() {
    const navigate = useNavigate();

    const [error, setError] = useState("");
    const [id, setId] = useState("");

    async function onJoin() {
        if (!id) return;

        if (id.length < ROOM_ID_LEN) {
            setError(`ids have at least ${ROOM_ID_LEN} characters`);
            return;
        }

        await browser.storage.local.set({ [STORAGE_LAST_ROOM_ID]: id });
        const url = urlbat("/room/:id", { id });
        navigate(url);
    }

    return (
        <Stack>
            <Group>
                <GoBack />
                <Title order={4}>Join a room</Title>
            </Group>

            <Stack mt="md">
                <TextInput
                    error={error}
                    label="Id"
                    placeholder="Enter Id"
                    value={id}
                    onChange={e => setId(e.target.value)}
                />

                <Button onClick={onJoin} ml="auto">
                    Join
                </Button>
            </Stack>
        </Stack>
    );
}
