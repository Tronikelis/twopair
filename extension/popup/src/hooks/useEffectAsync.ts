import { DependencyList, useEffect } from "react";

import useFnRef from "./useFnRef";

export default function useEffectAsync(_effect: () => Promise<void>, deps?: DependencyList) {
    const effect = useFnRef(_effect);

    useEffect(
        () => {
            effect();
        },
        deps ? [...deps, effect] : undefined
    );
}
