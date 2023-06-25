import { DependencyList, EffectCallback, useEffect, useRef } from "react";

export default function useEffectChange(
    effect: EffectCallback,
    deps: DependencyList = []
) {
    const mountedRef = useRef(false);

    useEffect(() => {
        return () => {
            mountedRef.current = false;
        };
    }, []);

    useEffect(() => {
        if (mountedRef.current) {
            return effect();
        }

        mountedRef.current = true;
    }, deps);
}
