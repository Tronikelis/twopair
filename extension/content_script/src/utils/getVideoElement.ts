import { VIDEO_ATTR_ID } from "../config/const";

export default function getVideoElement(videoId: string): HTMLVideoElement | undefined {
    const video = document.querySelector<HTMLVideoElement>(`[${VIDEO_ATTR_ID}="${videoId}"]`);
    return video || undefined;
}
