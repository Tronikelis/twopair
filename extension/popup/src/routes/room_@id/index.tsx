import React from "react";
import { Box, Group, Stack, Title } from "@mantine/core";
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
                <Box sx={{ flex: 0.7 }}>
                    <SelectVideo />
                </Box>
                <Box sx={{ flex: 0.3 }} />
            </Group>
        </Stack>
    );
}
