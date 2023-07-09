import { Button, Sx } from "@mantine/core";
import React, { forwardRef } from "react";
import { useNavigate } from "react-router-dom";

interface GoBackProps {
    sx?: Sx;
}

const GoBack = forwardRef<HTMLButtonElement, GoBackProps>(({ sx }, ref) => {
    const navigate = useNavigate();

    function onClick() {
        navigate(-1);
    }

    return (
        <Button sx={sx} onClick={onClick} size="xs" variant="subtle" ref={ref}>
            {"<< Back"}
        </Button>
    );
});

export default GoBack;
