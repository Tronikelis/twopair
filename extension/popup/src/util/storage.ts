import { nanoid } from "nanoid";
import browser from "webextension-polyfill";

import { STORAGE_USER_ID, STORAGE_USERNAME } from "../config/const";

export async function setDefaults() {
    await Promise.all([
        // set a persistent user id
        (async () => {
            const exists = (await browser.storage.local.get(STORAGE_USER_ID))[
                STORAGE_USER_ID
            ] as string | undefined;

            if (exists) return;
            await browser.storage.local.set({ [STORAGE_USER_ID]: nanoid() });
        })(),

        // set a default username
        (async () => {
            const exists = (await browser.storage.local.get(STORAGE_USERNAME))[
                STORAGE_USERNAME
            ] as string | undefined;

            if (exists) return;
            await browser.storage.local.set({ [STORAGE_USERNAME]: nanoid(4) });
        })(),
    ]);
}
