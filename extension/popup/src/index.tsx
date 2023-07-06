import { MantineProvider, Stack } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import React from "react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

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

    return (
        <MantineProvider withGlobalStyles withNormalizeCSS>
            <Notifications limit={1} />
            <Stack p="md" w={16 * 40} h={9 * 40} sx={{ overflow: "auto" }}>
                <RouterProvider router={router} />
            </Stack>
        </MantineProvider>
    );
}
