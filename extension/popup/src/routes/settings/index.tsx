import { Input, Stack, TextInput, Textarea, Title } from "@mantine/core";
import React from "react";
import useStorage from "~/popup/hooks/useStorage";

export default function Settings() {
    const [username, setUsername] = useStorage("username", "");

    return (
        <Stack>
            <Title order={3}>Settings</Title>

            <TextInput
                label="Username"
                placeholder="Your username"
                value={username}
                onChange={e => setUsername(e.target.value)}
            />
        </Stack>
    );
}
