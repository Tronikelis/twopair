import { useDidUpdate } from "@mantine/hooks";
import { useEffect, useRef, useState } from "react";
import browser from "webextension-polyfill";

import noop from "~/utils/noop";

import useEffectAsync from "./useEffectAsync";

export default function useStorage<T>(key: string, def: T) {
    const [state, setState] = useState(def);

    const stateRef = useRef(state);
    stateRef.current = state;

    // listen for changes outside of this hook
    useEffect(() => {
        function onChange(changes: browser.Storage.StorageAreaOnChangedChangesType) {
            const change = changes[key];

            if (!change?.newValue) return;
            if (change.newValue === stateRef.current) return;

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

        if (!value || value === stateRef.current) return;
        setState(value);
    }, []);

    // update not on mount, only when state changes
    useDidUpdate(() => {
        browser.storage.local.set({ [key]: state }).catch(noop);
    }, [state]);

    return [state, setState] as const;
}
