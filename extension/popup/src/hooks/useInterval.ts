import { useEffect, useRef } from "react";

import useFnRef from "./useFnRef";

export default function useInterval(_cb: () => void, ms = 1e3) {
    const cb = useFnRef(_cb);
    const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

    useEffect(() => {
        intervalRef.current = setInterval(cb, ms);
        return () => {
            if (!intervalRef.current) return;
            clearInterval(intervalRef.current);
        };
    }, [cb, ms]);

    const stop = useFnRef(() => {
        if (!intervalRef.current) return;
        clearInterval(intervalRef.current);
    });

    const reset = useFnRef(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(cb, ms);
    });

    return { stop, reset };
}
