import { User } from "backend/src/types/socket.io";

import { STORAGE_USER_ID, STORAGE_USERNAME } from "../config/const";

import useStorage from "./useStorage";

export default function useUser(): User | undefined {
    const [id] = useStorage(STORAGE_USER_ID, "");
    const [username] = useStorage(STORAGE_USERNAME, "");

    if (!id || !username) {
        return undefined;
    }

    return { id, username };
}
