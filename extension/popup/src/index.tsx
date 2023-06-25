import React from "react";
import { Stack, MantineProvider } from "@mantine/core";

import { createMemoryRouter, RouterProvider } from "react-router-dom";
import Idx from "./routes/idx";
import RoomCreate from "./routes/room_create";
import RoomJoin from "./routes/room_join";

const router = createMemoryRouter([
    {
        path: "/",
        element: <Idx />,
    },
    {
        path: "/room/create",
        element: <RoomCreate />,
    },
    {
        path: "/room/join",
        element: <RoomJoin />,
    },
]);

export default function Main() {
    return (
        <MantineProvider withGlobalStyles withNormalizeCSS>
            <Stack p="md" w={16 * 25} h={9 * 25}>
                <RouterProvider router={router} />
            </Stack>
        </MantineProvider>
    );
}
