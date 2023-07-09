import { Box, Group, Stack } from "@mantine/core";
import React from "react";
import { useParams } from "react-router-dom";

import LeaveRoomBnt from "~/popup/components/LeaveRoomBtn";
import RouteTitle from "~/popup/components/RouteTitle";

import Room from "./Room";
import SelectVideo from "./SelectVideo";
import ShareWebsiteUrl from "./ShareWebsiteUrl";

export default function RoomId() {
    const { id: roomId } = useParams();

    return (
        <Stack>
            <RouteTitle
                title={`Room ${roomId}`}
                action={<LeaveRoomBnt size="xs" variant="subtle" />}
            />

            <ShareWebsiteUrl />

            <Group align="flex-start">
                <Box sx={{ flex: 0.3 }}>
                    <SelectVideo />
                </Box>
                <Box sx={{ flex: 0.7 }}>
                    <Room />
                </Box>
            </Group>
        </Stack>
    );
}
