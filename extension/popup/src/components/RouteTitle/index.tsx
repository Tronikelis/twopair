import { Group, Title } from "@mantine/core";
import React, { forwardRef, ReactNode } from "react";

import GoBack from "../GoBack";

interface RouteTitleProps {
    title: string;
    action?: ReactNode;
    withBack?: boolean;
}

const RouteTitle = forwardRef<HTMLDivElement, RouteTitleProps>(
    ({ action, title, withBack = true }, ref) => {
        return (
            <Group ref={ref}>
                {withBack && <GoBack />}
                <Title order={3}>{title}</Title>
                {action}
            </Group>
        );
    }
);

export default RouteTitle;
