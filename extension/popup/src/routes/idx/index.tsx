import { Box, Button, Group, Stack, Text, Title } from "@mantine/core";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { STORAGE_USERNAME } from "~/popup/config/const";
import useStorage from "~/popup/hooks/useStorage";

export default function Idx() {
    const [username] = useStorage(STORAGE_USERNAME, "");

    return (
        <Stack spacing="xl" justify="center" sx={{ flex: 1 }}>
            <Title order={3} align="center">
                WAT - Watch Anything Together
            </Title>

            <Text align="center">
                Welcome{" "}
                {username || (
                    <Text span italic>
                        change name in settings
                    </Text>
                )}
            </Text>

            <Group sx={{ justifyContent: "center" }}>
                <Button to="/room/own" component={Link}>
                    My room
                </Button>
                <Button to="/room/join" component={Link}>
                    Join room
                </Button>
            </Group>

            <Box ml="auto">
                <Button to="/settings" color="gray" component={Link}>
                    Settings
                </Button>
            </Box>
        </Stack>
    );
}
