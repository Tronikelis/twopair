import { Group, Input, Stack, Textarea, TextInput, Title } from "@mantine/core";
import React from "react";

import GoBack from "~/popup/components/GoBack";
import { STORAGE_USERNAME } from "~/popup/config/const";
import useStorage from "~/popup/hooks/useStorage";

export default function Settings() {
    const [username, setUsername] = useStorage(STORAGE_USERNAME, "");

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
