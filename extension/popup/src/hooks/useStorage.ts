import { useEffect, useState } from "react";
import browser from "webextension-polyfill";
import useEffectChange from "./useEffectChange";

export default function useStorage<T>(key: string, def: T) {
    const [state, setState] = useState(def);

    useEffect(() => {
        function onChange(
            changes: browser.Storage.StorageAreaOnChangedChangesType
        ) {
            const change = changes[key];
            if (!change) return;

            setState(change.newValue as T);
        }

        browser.storage.local.onChanged.addListener(onChange);
        return () => browser.storage.local.onChanged.removeListener(onChange);
    }, []);

    useEffect(() => {
        (async () => {
            const value = (await browser.storage.local.get(key))[key] as
                | T
                | undefined;

            if (!value) return;
            setState(value);
        })();
    }, []);

    useEffectChange(() => {
        browser.storage.local.set({ [key]: state });
    }, [state]);

    return [state, setState] as const;
}
