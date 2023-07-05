import { Anchor, Box, Button, Stack } from "@mantine/core";
import { useAtom } from "jotai";
import React from "react";
import { useParams } from "react-router-dom";

import { sendToContent } from "~/comms";
import getTabUrl from "~/popup/utils/getTabUrl";

import { roomAtom } from "../store";

export default function ShareWebsiteUrl() {
    const { id: roomId } = useParams();
    const [room, setRoom] = useAtom(roomAtom);

    async function onShareUrl() {
        if (!roomId) return;

        const websiteUrl = await getTabUrl();
        const { room } = await sendToContent("SET_WEBSITE_URL", { roomId, websiteUrl });
        if (!room) {
            // handle err
            return;
        }

        setRoom(room);
    }

    let truncatedUrl = room?.websiteUrl?.split("://").at(-1);
    if (truncatedUrl && truncatedUrl.length > 40) {
        truncatedUrl = truncatedUrl.slice(0, 40) + "...";
    }

    return (
        <Stack spacing="xs" align="center">
            <Anchor italic href={room?.websiteUrl || "#"}>
                {truncatedUrl || "example.com/video"}
            </Anchor>

            <Box>
                <Button onClick={onShareUrl} size="xs" variant="subtle">
                    Share my URL
                </Button>
            </Box>
        </Stack>
    );
}
