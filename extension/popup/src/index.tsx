import React from "react";
import { Stack, MantineProvider } from "@mantine/core";
import browser from "webextension-polyfill";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import Idx from "./routes/idx";
import RoomOwn from "./routes/room_own";
import RoomJoin from "./routes/room_join";
import Settings from "./routes/settings";
import RoomId from "./routes/room_@id";
import { STORAGE_USERNAME, STORAGE_USER_ID } from "./config/const";
import { nanoid } from "nanoid";

const router = createMemoryRouter([
    {
        path: "/",
        element: <Idx />,
    },
    {
        path: "/room/own",
        element: <RoomOwn />,
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

// set a persistent user id
(async () => {
    const exists = (await browser.storage.local.get(STORAGE_USER_ID))[
        STORAGE_USER_ID
    ] as string | undefined;

    if (exists) return;
    await browser.storage.local.set({ [STORAGE_USER_ID]: nanoid() });
})();

// set a default username
(async () => {
    const exists = (await browser.storage.local.get(STORAGE_USERNAME))[
        STORAGE_USERNAME
    ] as string | undefined;

    if (exists) return;
    await browser.storage.local.set({ [STORAGE_USERNAME]: nanoid(4) });
})();

export default function Main() {
    return (
        <MantineProvider withGlobalStyles withNormalizeCSS>
            <Stack p="md" w={16 * 30} h={9 * 30} sx={{ overflow: "auto" }}>
                <RouterProvider router={router} />
            </Stack>
        </MantineProvider>
    );
}
