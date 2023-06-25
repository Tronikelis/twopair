import { Group, Input, Stack, TextInput, Textarea, Title } from "@mantine/core";
import React from "react";
import GoBack from "~/popup/components/GoBack";
import useStorage from "~/popup/hooks/useStorage";

export default function Settings() {
    const [username, setUsername] = useStorage("username", "");

    return (
        <Stack>
            <Group>
                <GoBack />
                <Title order={3}>Settings</Title>
            </Group>

            <TextInput
                label="Username"
                placeholder="Your username"
                value={username}
                onChange={e => setUsername(e.target.value)}
            />
        </Stack>
    );
}
