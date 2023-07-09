import { Box, Button, ButtonProps, Tooltip } from "@mantine/core";
import React, { ComponentPropsWithoutRef, forwardRef, MouseEvent } from "react";

import { sendToBg } from "~/comms";
import { STORAGE_LAST_ROOM_ID } from "~/popup/config/const";
import useStorage from "~/popup/hooks/useStorage";
import useUser from "~/popup/hooks/useUser";
import useValidActions from "~/popup/hooks/useValidActions";

const leaveConditions = "Can only leave if video is syncing and you are in the same tab!";

const LeaveRoomBnt = forwardRef<
    HTMLButtonElement,
    ButtonProps & ComponentPropsWithoutRef<"button">
>(({ onClick, children, ...props }, ref) => {
    const user = useUser();
    const actions = useValidActions();

    const [lastRoomId] = useStorage(STORAGE_LAST_ROOM_ID, "");

    async function onLeave(e: MouseEvent<HTMLButtonElement>) {
        if (onClick) onClick(e);

        if (!user || !lastRoomId) return;
        await sendToBg("LEAVE_ROOM", { roomId: lastRoomId, userId: user.id });
    }

    return (
        <Tooltip openDelay={500} label={leaveConditions} disabled={actions.canLeaveRoom}>
            <Box>
                <Button
                    color="red"
                    onClick={onLeave}
                    disabled={!actions.canLeaveRoom}
                    {...props}
                    ref={ref}
                >
                    {children || "Leave"}
                </Button>
            </Box>
        </Tooltip>
    );
});

export default LeaveRoomBnt;
