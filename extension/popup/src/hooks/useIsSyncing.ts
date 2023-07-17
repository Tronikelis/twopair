import useGetSyncingStatus from "./useGetSyncingStatus";

export default function useIsSyncing() {
    const status = useGetSyncingStatus();
    return status?.tabId !== undefined || status?.videoId !== undefined;
}
