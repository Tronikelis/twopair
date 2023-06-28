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
