import useGetSyncingStatus from "./useGetSyncingStatus";

type Actions = {
    canCreateRoom: boolean;
    canLeaveRoom: boolean;
};

// note: status.syncingId is independent for every tab
// meaning we can check if we are currently globally syncing with "status.syncing"
// and if that syncing is happening in this tab if the "status.syncingId" is truthy

// if we are syncing, but not in this tab and we want to leave:
// we need to somehow force the user to go to the tab where the syncing is happening
// and leave the room from that tab (content_script on THAT SPECIFIC needs to remove event listeners)

// 🤔 🤨 💀
export default function useValidActions(): Actions {
    const status = useGetSyncingStatus();

    if (!status) {
        return {
            canCreateRoom: false,
            canLeaveRoom: false,
        };
    }

    const otherTab = status.syncing && !status.syncingId;
    const off = !status.syncing && !status.syncing;

    return {
        canCreateRoom: !status.syncing && !status.syncingId,
        canLeaveRoom:
            // oh my god
            !otherTab && !off,
    };
}
