import { Button, Group, Stack, Text, Title } from "@mantine/core";
import { nanoid } from "nanoid";
import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import urlbat from "urlbat";
import browser from "webextension-polyfill";

import GoBack from "~/popup/components/GoBack";
import { STORAGE_OWN_ROOM_ID } from "~/popup/config/const";
import useStorage from "~/popup/hooks/useStorage";

export default function RoomOwn() {
    const navigate = useNavigate();

    const [ownRoomId] = useStorage(STORAGE_OWN_ROOM_ID, "");

    async function onGenerateNew() {
        const id = nanoid(8);
        const url = urlbat("/room/:id", {
            id,
        });

        await browser.storage.local.set({ [STORAGE_OWN_ROOM_ID]: id });
        navigate(url);
    }

    return (
        <Stack>
            <Group>
                <GoBack />
                <Title order={3}>My room: {ownRoomId}</Title>
            </Group>

            <Stack mt="md">
                <Group sx={{ justifyContent: "center" }}>
                    <Button onClick={onGenerateNew}>Generate new</Button>

                    {ownRoomId && (
                        <Button
                            to={urlbat("/room/:roomId", { roomId: ownRoomId })}
                            component={Link}
                        >
                            Go to last one
                        </Button>
                    )}
                </Group>
            </Stack>
        </Stack>
    );
}
