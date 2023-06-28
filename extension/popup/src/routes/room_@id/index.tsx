import React from "react";
import { Group, Stack, Title } from "@mantine/core";
import { useParams } from "react-router-dom";
import GoBack from "~/popup/components/GoBack";

import SelectVideo from "./SelectVideo";

export default function RoomId() {
    const { id } = useParams();

    return (
        <Stack>
            <Group>
                <GoBack />
                <Title order={3}>Room id: {id}</Title>
            </Group>

            <Group>
                <SelectVideo />
            </Group>
        </Stack>
    );
}
