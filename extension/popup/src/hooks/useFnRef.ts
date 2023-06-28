import { useCallback, useRef } from "react";

export type AnyFunction = (...params: any) => any;

/**
 * uses a ref to always call the latest function without stale closure variables, just pass a function to this
 * the returned function is **useEffect dependency SAFE**
 * @link https://tronikelis.github.io/posts/use-fn-ref/
 */
export default function useFnRef<T extends AnyFunction | undefined>(fn: T): T {
    const fnRef = useRef(fn);
    fnRef.current = fn;

    // memoize, so callbacks do not re-run when passed into useEffect []
    const latest = useCallback((...params: any[]) => {
        if (fnRef.current) return fnRef.current(...params);
    }, []);

    return (fnRef.current ? latest : fnRef.current) as T;
}
