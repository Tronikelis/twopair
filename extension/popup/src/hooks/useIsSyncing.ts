import useGetSyncingStatus from "./useGetSyncingStatus";

export default function useIsSyncing() {
    const syncing = useGetSyncingStatus();
    return syncing?.tabId !== undefined || syncing?.videoId !== undefined;
}
