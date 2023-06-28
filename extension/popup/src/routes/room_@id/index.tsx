import React from "react";
import { Box, Group, Stack, Title } from "@mantine/core";
import { useParams } from "react-router-dom";
import GoBack from "~/popup/components/GoBack";

import SelectVideo from "./SelectVideo";
import Room from "./Room";

export default function RoomId() {
    const { id } = useParams();

    return (
        <Stack>
            <Group>
                <GoBack />
                <Title order={3}>Room id: {id}</Title>
            </Group>

            <Group align="flex-start">
                <Box sx={{ flex: 0.6 }}>
                    <SelectVideo />
                </Box>
                <Box sx={{ flex: 0.4 }}>
                    <Room />
                </Box>
            </Group>
        </Stack>
    );
}
