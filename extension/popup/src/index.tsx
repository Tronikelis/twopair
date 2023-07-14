import { MantineProvider, Stack } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import React from "react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import browser from "webextension-polyfill";

import useEffectAsync from "./hooks/useEffectAsync";
import Idx from "./routes/idx";
import RoomId from "./routes/room_@id";
import RoomJoin from "./routes/room_join";
import Settings from "./routes/settings";
import { setDefaults } from "./utils/storage";

const router = createMemoryRouter([
    {
        path: "/",
        element: <Idx />,
    },
    {
        path: "/room/join",
        element: <RoomJoin />,
    },
    {
        path: "/settings",
        element: <Settings />,
    },
    {
        path: "/room/:id",
        element: <RoomId />,
    },
]);

export default function Main() {
    useEffectAsync(setDefaults, []);

    useEffectAsync(async () => {
        const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
        if (!tab) console.error("did find a tab to inject the script into");

        await browser.scripting.executeScript({
            target: { tabId: tab?.id as number },
            files: ["/content_script/dist/index.js"],
            injectImmediately: true,
        });
    }, []);

    return (
        <MantineProvider withGlobalStyles withNormalizeCSS>
            <Notifications limit={1} />
            <Stack p="md" w={16 * 40} h={9 * 40} sx={{ overflow: "auto" }}>
                <RouterProvider router={router} />
            </Stack>
        </MantineProvider>
    );
}
