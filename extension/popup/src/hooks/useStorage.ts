import { useDidUpdate } from "@mantine/hooks";
import { useEffect, useState } from "react";
import browser from "webextension-polyfill";

import noop from "~/utils/noop";

import useEffectAsync from "./useEffectAsync";

export default function useStorage<T>(key: string, def: T) {
    const [state, setState] = useState(def);

    // listen for changes outside of this hook
    useEffect(() => {
        function onChange(changes: browser.Storage.StorageAreaOnChangedChangesType) {
            const change = changes[key];
            if (!change?.newValue) return;
            setState(change.newValue);
        }

        browser.storage.local.onChanged.addListener(onChange);
        return () => {
            browser.storage.local.onChanged.removeListener(onChange);
        };
    }, [key]);

    // sync on mount
    useEffectAsync(async () => {
        const value = (await browser.storage.local.get(key))[key] as T | undefined;
        if (!value) return;
        setState(value);
    }, []);

    // update not on mount, only when state changes
    useDidUpdate(() => {
        browser.storage.local.set({ [key]: state }).catch(noop);
    }, [state]);

    return [state, setState] as const;
}
