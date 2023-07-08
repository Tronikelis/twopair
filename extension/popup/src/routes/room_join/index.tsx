import { Button, Stack, TextInput } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import urlbat from "urlbat";
import browser from "webextension-polyfill";

import { sendToBg } from "~/comms";
import RouteTitle from "~/popup/components/RouteTitle";
import { STORAGE_LAST_ROOM_ID } from "~/popup/config/const";
import useUser from "~/popup/hooks/useUser";
import { showInjectScriptErr } from "~/popup/utils/notify";
import tryCatch from "~/utils/tryCatch";

export default function RoomJoin() {
    const navigate = useNavigate();

    const [error, setError] = useState("");
    const [id, setId] = useState("");

    const user = useUser();

    useEffect(() => {
        setError("");
    }, [id]);

    async function onJoin() {
        if (!id || !user) return;

        const [err, data] = await tryCatch(() =>
            sendToBg("JOIN_ROOM", {
                roomId: id,
                user,
            })
        );
        if (err) {
            showInjectScriptErr();
            return;
        }

        if (!data.room) {
            setError("This room does not exist");
            return;
        }

        await browser.storage.local.set({ [STORAGE_LAST_ROOM_ID]: id });
        const url = urlbat("/room/:id", { id });
        navigate(url);
    }

    return (
        <Stack>
            <RouteTitle title="Join a room" />

            <Stack mt="md">
                <TextInput
                    error={error}
                    label="Id"
                    placeholder="Enter Id"
                    value={id}
                    onChange={e => setId(e.target.value)}
                />

                <Button onClick={onJoin} ml="auto">
                    Join
                </Button>
            </Stack>
        </Stack>
    );
}
