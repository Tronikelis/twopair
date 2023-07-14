import { pino } from "pino";

let id = 0;
const logger = pino({
    mixin: () => ({
        // saving a lil bit of space with hex
        id: (id++).toString(16),
    }),
});

export default logger;
