import { SetSyncingVideoData } from "~/comms";

export let syncingVideoId = "";

export default function setSyncingVideo(input: SetSyncingVideoData) {
    syncingVideoId = input.videoId;
}
