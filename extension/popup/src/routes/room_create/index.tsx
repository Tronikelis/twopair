import { Stack, Title, Text, Group } from "@mantine/core";
import React, { useRef } from "react";
import GoBack from "~/popup/components/GoBack";

function genId(): string {
    const array = new Uint8Array(8);
    crypto.getRandomValues(array);
    return array.join("");
}

export default function RoomCreate() {
    const roomId = useRef(genId());

    return (
        <Stack>
            <Group>
                <GoBack />
                <Title order={3}>Create a room</Title>
            </Group>
            <Text>ID: {roomId.current}</Text>
        </Stack>
    );
}
