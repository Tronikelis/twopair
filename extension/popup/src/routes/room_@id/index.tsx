import { Group, Stack, Text, Title } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import browser from "webextension-polyfill";
import GoBack from "~/popup/components/GoBack";
import { STORAGE_USERNAME, STORAGE_USER_ID } from "~/popup/config/const";
import { socket } from "~/popup/socket.io";

import { JOIN_ROOM } from "backend/src/config/events";
import {
    JoinRoomClient,
    JoinRoomServer,
    Room,
} from "backend/src/types/socket.io";
import useStorage from "~/popup/hooks/useStorage";

export default function RoomId() {
    const { id } = useParams();

    const [userId] = useStorage(STORAGE_USER_ID, "");
    const [username] = useStorage(STORAGE_USERNAME, "unknown");

    const [room, setRoom] = useState<Room | undefined>(undefined);

    useEffect(() => {
        if (!id || !userId || !username) return;

        console.log("EMITTING");

        socket.emit(JOIN_ROOM, {
            id,
            user: {
                id: userId,
                username,
            },
        } satisfies JoinRoomClient);

        socket.on(JOIN_ROOM, ({ room }: JoinRoomServer) => {
            setRoom(room);
        });

        return () => {
            socket.offAny();
        };
    }, [id, userId]);

    return (
        <Stack>
            <Group>
                <GoBack />
                <Title order={3}>Room id: {id}</Title>
            </Group>

            <Text component="pre">{room && JSON.stringify(room, null, 4)}</Text>
        </Stack>
    );
}
