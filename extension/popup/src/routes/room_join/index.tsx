import { Group, Stack, Title } from "@mantine/core";
import React from "react";
import GoBack from "~/popup/components/GoBack";

export default function RoomJoin() {
    return (
        <Stack>
            <Group>
                <GoBack />
                <Title order={4}>Join a room</Title>
            </Group>
        </Stack>
    );
}
