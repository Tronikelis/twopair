import { User } from "backend/src/types/socket.io";

import { STORAGE_USER_ID, STORAGE_USERNAME } from "../config/const";

import useIsSyncing from "./useIsSyncing";
import useStorage from "./useStorage";

export default function useUser(): User | undefined {
    const [id] = useStorage(STORAGE_USER_ID, "");
    const [username] = useStorage(STORAGE_USERNAME, "");

    const syncing = useIsSyncing();

    if (!id || !username) {
        return undefined;
    }

    return { id, username, syncing };
}
