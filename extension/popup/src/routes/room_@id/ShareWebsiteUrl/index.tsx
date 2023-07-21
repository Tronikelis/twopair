import { Box, Button, Stack } from "@mantine/core";
import { useAtom } from "jotai";
import React from "react";
import { useParams } from "react-router-dom";

import { sendToBg } from "~/comms";
import ExternalLink from "~/popup/components/ExternalLink";
import getTabUrl from "~/popup/utils/getTabUrl";

import { roomAtom } from "../store";

export default function ShareWebsiteUrl() {
    const { id: roomId } = useParams();
    const [room, setRoom] = useAtom(roomAtom);

    async function onShareUrl() {
        if (!roomId) return;

        const websiteUrl = await getTabUrl();
        const { room } = await sendToBg("SET_WEBSITE_URL", { roomId, websiteUrl });
        if (!room) {
            // handle err
            return;
        }

        setRoom(room);
    }

    const placeholderUrl = "https://youtube.com";
    let truncatedUrl = (room?.websiteUrl || placeholderUrl).split("://").at(-1);
    if (truncatedUrl && truncatedUrl.length > 40) {
        truncatedUrl = truncatedUrl.slice(0, 40) + "...";
    }

    return (
        <Stack spacing="xs" align="center">
            <ExternalLink italic href={room?.websiteUrl || placeholderUrl}>
                {truncatedUrl}
            </ExternalLink>

            <Box>
                <Button onClick={onShareUrl} size="xs" variant="outline">
                    Share video URL
                </Button>
            </Box>
        </Stack>
    );
}
