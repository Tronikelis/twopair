import { Box, Button, ButtonProps } from "@mantine/core";
import React, { ComponentPropsWithoutRef, forwardRef, MouseEvent } from "react";

import { sendToBg } from "~/comms";
import { STORAGE_LAST_ROOM_ID } from "~/popup/config/const";
import useStorage from "~/popup/hooks/useStorage";
import useUser from "~/popup/hooks/useUser";

const LeaveRoomBnt = forwardRef<
    HTMLButtonElement,
    ButtonProps & ComponentPropsWithoutRef<"button">
>(({ onClick: _onClick, children, ...props }, ref) => {
    const user = useUser();

    const [lastRoomId] = useStorage(STORAGE_LAST_ROOM_ID, "");

    async function onLeave(e: MouseEvent<HTMLButtonElement>) {
        if (_onClick) _onClick(e);

        if (!user || !lastRoomId) return;
        await sendToBg("LEAVE_ROOM", { roomId: lastRoomId, userId: user.id });
    }

    return (
        <Box>
            <Button
                color="red"
                onClick={onLeave}
                disabled={!user || !user.syncing}
                {...props}
                ref={ref}
            >
                {children || "Leave"}
            </Button>
        </Box>
    );
});

export default LeaveRoomBnt;
