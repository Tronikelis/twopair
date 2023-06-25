import React from "react";
import { Button, Group, Stack, Title } from "@mantine/core";
import { Link } from "react-router-dom";

export default function Idx() {
    return (
        <Stack spacing="xl">
            <Title order={3}>WAT - Watch Anything Together</Title>
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
