import { DependencyList, useEffect } from "react";

import noop from "~/utils/noop";

import useFnRef from "./useFnRef";

export default function useEffectAsync(_effect: () => Promise<void>, deps?: DependencyList) {
    const effect = useFnRef(_effect);

    useEffect(
        () => {
            // the error should be handled in the effect() anyways
            effect().catch(noop);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        deps ? [...deps, effect] : undefined
    );
}
