import { VIDEO_ATTR_IS_SYNCING } from "../config/const";

export default function getSyncingVideo(): HTMLVideoElement | undefined {
    return (
        document.querySelector<HTMLVideoElement>(`[${VIDEO_ATTR_IS_SYNCING}="true"]`) ||
        undefined
    );
}
