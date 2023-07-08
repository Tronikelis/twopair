import { Box, Button, Group, Stack } from "@mantine/core";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { sendToBg } from "~/comms";
import RouteTitle from "~/popup/components/RouteTitle";
import useUser from "~/popup/hooks/useUser";
import useValidActions from "~/popup/hooks/useValidActions";

import Room from "./Room";
import SelectVideo from "./SelectVideo";
import ShareWebsiteUrl from "./ShareWebsiteUrl";

export default function RoomId() {
    const navigate = useNavigate();
    const { id: roomId } = useParams();

    const actions = useValidActions();
    const user = useUser();

    async function onLeaveRoom() {
        if (!user || !roomId) return;
        await sendToBg("LEAVE_ROOM", { roomId, userId: user.id });
        navigate("/");
    }

    return (
        <Stack>
            <RouteTitle
                title={`Room ${roomId}`}
                action={
                    <Button
                        disabled={!actions.canLeaveRoom}
                        onClick={onLeaveRoom}
                        size="xs"
                        variant="subtle"
                        color="red"
                    >
                        Leave
                    </Button>
                }
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
