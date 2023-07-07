import { Anchor, AnchorProps } from "@mantine/core";
import React, { ComponentPropsWithRef, forwardRef, MouseEvent } from "react";

const ExternalLink = forwardRef<HTMLAnchorElement, AnchorProps & ComponentPropsWithRef<"a">>(
    ({ children, onClick: _onClick, ...props }, ref) => {
        function onClick(e: MouseEvent<HTMLAnchorElement>) {
            if (_onClick) _onClick(e);
            setTimeout(() => window.close(), 1e3);
        }

        return (
            <Anchor target="_blank" {...props} ref={ref} onClick={onClick}>
                {children}
            </Anchor>
        );
    }
);

export default ExternalLink;
