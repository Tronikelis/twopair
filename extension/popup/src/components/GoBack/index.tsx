import { Button, Sx } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";

interface GoBackProps {
    sx?: Sx;
}

export default function GoBack({ sx }: GoBackProps) {
    const navigate = useNavigate();

    function onClick() {
        navigate(-1);
    }

    return (
        <Button sx={sx} onClick={onClick} size="xs" variant="subtle">
            {"<< Back"}
        </Button>
    );
}
