import React from "react";
import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export default function GoBack() {
    const navigate = useNavigate();

    function onClick() {
        navigate(-1);
    }

    return (
        <Button onClick={onClick} variant="subtle">
            {"<< Back"}
        </Button>
    );
}
