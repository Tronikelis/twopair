import { Stack, Title, Text, Group, Button } from "@mantine/core";
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import GoBack from "~/popup/components/GoBack";
import useStorage from "~/popup/hooks/useStorage";
import urlbat from "urlbat";
import { STORAGE_OWN_ROOM_ID } from "~/popup/config/const";
import browser from "webextension-polyfill";

function genId(): string {
    const array = new Uint8Array(4);
    crypto.getRandomValues(array);
    return array.join("");
}

export default function RoomOwn() {
    const newRoomId = useRef(genId());
    const [ownRoomId] = useStorage(STORAGE_OWN_ROOM_ID, "");

    return (
        <Stack>
            <Group>
                <GoBack />
                <Title order={3}>My room: {ownRoomId}</Title>
            </Group>

            <Stack mt="md">
                <Group sx={{ justifyContent: "center" }}>
                    <Button
                        to={urlbat("/room/:roomId", {
                            roomId: newRoomId.current,
                            own: true,
                        })}
                        component={Link}
                    >
                        Generate new
                    </Button>

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
