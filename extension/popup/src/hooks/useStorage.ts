import { useEffect, useRef, useState } from "react";
import browser from "webextension-polyfill";
import { useDidUpdate } from "@mantine/hooks";

export default function useStorage<T>(key: string, def: T) {
    const [state, setState] = useState(def);

    const stateRef = useRef(state);
    stateRef.current = state;

    useEffect(() => {
        function onChange(
            changes: browser.Storage.StorageAreaOnChangedChangesType
        ) {
            const change = changes[key];

            if (!change?.newValue) return;
            if (change.newValue === stateRef.current) return;

            setState(change.newValue);
        }

        browser.storage.local.onChanged.addListener(onChange);
        return () => {
            browser.storage.local.onChanged.removeListener(onChange);
        };
    }, []);

    useEffect(() => {
        (async () => {
            const value = (await browser.storage.local.get(key))[key] as
                | T
                | undefined;

            if (!value || value === stateRef.current) return;
            setState(value);
        })();
    }, []);

    useDidUpdate(() => {
        browser.storage.local.set({ [key]: state });
    }, [state]);

    return [state, setState] as const;
}
