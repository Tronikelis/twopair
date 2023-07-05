import { Stack, TextInput } from "@mantine/core";
import React from "react";

import RouteTitle from "~/popup/components/RouteTitle";
import { STORAGE_USERNAME } from "~/popup/config/const";
import useStorage from "~/popup/hooks/useStorage";

export default function Settings() {
    const [username, setUsername] = useStorage(STORAGE_USERNAME, "");

    return (
        <Stack>
            <RouteTitle title="Settings" />

            <TextInput
                label="Username"
                placeholder="Your username"
                value={username}
                onChange={e => setUsername(e.target.value)}
            />
        </Stack>
    );
}
