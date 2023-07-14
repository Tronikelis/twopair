import noop from "~/utils/noop";

type AnyFn = (...args: any) => void;

const globals = {
    onSyncVideo: noop as AnyFn,
};

export default globals;
