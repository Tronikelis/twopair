import { Button, Group, Stack, TextInput, Title } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import urlbat from "urlbat";
import browser from "webextension-polyfill";

import { sendToContent } from "~/comms";
import GoBack from "~/popup/components/GoBack";
import { STORAGE_LAST_ROOM_ID } from "~/popup/config/const";
import useUser from "~/popup/hooks/useUser";

export default function RoomJoin() {
    const navigate = useNavigate();

    const [error, setError] = useState("");
    const [id, setId] = useState("");

    const user = useUser();

    useEffect(() => {
        setError("");
    }, [id]);

    async function onJoin() {
        if (!id || !user) return;

        const { room } = await sendToContent("JOIN_ROOM", {
            roomId: id,
            user,
        });
        if (!room) {
            setError("This room does not exist");
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
