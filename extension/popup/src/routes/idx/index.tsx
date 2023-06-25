import React, { useEffect } from "react";
import { Button, Group, Stack, Title, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import useStorage from "~/popup/src/hooks/useStorage";

export default function Idx() {
    const [username] = useStorage("username", "");

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
                <Button to="/room/create" component={Link}>
                    Create room
                </Button>
                <Button to="/room/join" component={Link}>
                    Join room
                </Button>
            </Group>
        </Stack>
    );
}
