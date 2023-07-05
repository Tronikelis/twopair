import { Box, Button, Group, Stack } from "@mantine/core";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { sendToContent } from "~/comms";
import RouteTitle from "~/popup/components/RouteTitle";
import useUser from "~/popup/hooks/useUser";

import Room from "./Room";
import SelectVideo from "./SelectVideo";

export default function RoomId() {
    const navigate = useNavigate();
    const { id: roomId } = useParams();

    const user = useUser();

    async function onLeaveRoom() {
        if (!user || !roomId) return;
        await sendToContent("LEAVE_ROOM", { roomId, userId: user.id });
        navigate("/");
    }

    return (
        <Stack>
            <RouteTitle
                title={`Room ${roomId}`}
                action={
                    <Button onClick={onLeaveRoom} size="xs" variant="light" color="red">
                        Leave
                    </Button>
                }
            />

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
