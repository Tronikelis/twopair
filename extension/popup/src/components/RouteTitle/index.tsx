import { Group, Title } from "@mantine/core";
import React, { ReactNode } from "react";

import GoBack from "../GoBack";

interface RouteTitleProps {
    title: string;
    action?: ReactNode;
    withBack?: boolean;
}

export default function RouteTitle({ action, title, withBack = true }: RouteTitleProps) {
    return (
        <Group>
            {withBack && <GoBack />}
            <Title order={3}>{title}</Title>
            {action}
        </Group>
    );
}
