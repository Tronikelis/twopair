import { Button, Group, Stack, TextInput, Title } from "@mantine/core";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import urlbat from "urlbat";

import GoBack from "~/popup/components/GoBack";

export default function RoomJoin() {
    const navigate = useNavigate();

    const [id, setId] = useState("");

    function onJoin() {
        if (!id) return;
        const url = urlbat("/room/:id", { id });
        navigate(url);
    }

    return (
        <Stack>
            <Group>
                <GoBack />
                <Title order={4}>Join a room</Title>
            </Group>

            <Group mt="md" sx={{ justifyContent: "center" }}>
                <TextInput
                    label="Id"
                    placeholder="Enter Id"
                    value={id}
                    onChange={e => setId(e.target.value)}
                />

                <Button onClick={onJoin} sx={{ alignSelf: "flex-end" }}>
                    Join
                </Button>
            </Group>
        </Stack>
    );
}
