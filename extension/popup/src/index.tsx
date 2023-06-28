import { MantineProvider, Stack } from "@mantine/core";
import { nanoid } from "nanoid";
import React from "react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import browser from "webextension-polyfill";

import { STORAGE_USER_ID, STORAGE_USERNAME } from "./config/const";
import Idx from "./routes/idx";
import RoomId from "./routes/room_@id";
import RoomJoin from "./routes/room_join";
import RoomOwn from "./routes/room_own";
import Settings from "./routes/settings";
import { setDefaults } from "./util/storage";

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

setDefaults();

export default function Main() {
    return (
        <MantineProvider withGlobalStyles withNormalizeCSS>
            <Stack p="md" w={16 * 30} h={9 * 30} sx={{ overflow: "auto" }}>
                <RouterProvider router={router} />
            </Stack>
        </MantineProvider>
    );
}
