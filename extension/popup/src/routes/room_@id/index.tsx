import { Group, Stack, Title } from "@mantine/core";
import React, { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import browser from "webextension-polyfill";
import GoBack from "~/popup/components/GoBack";
import { STORAGE_OWN_ROOM_ID } from "~/popup/config/const";

export default function RoomId() {
    const { id } = useParams();
    const [query] = useSearchParams();

    useEffect(() => {
        if (!id || !query.get("own")) return;
        browser.storage.local.set({ [STORAGE_OWN_ROOM_ID]: id });
    }, [id, query.get("own")]);

    return (
        <Stack>
            <Group>
                <GoBack />
                <Title order={3}>Room id: {id}</Title>
            </Group>
        </Stack>
    );
}
