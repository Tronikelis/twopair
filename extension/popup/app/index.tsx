import React, { useEffect, useState } from "react";
import browser from "webextension-polyfill";
import { sendToContent } from "../../utils/comms";

export default function App() {
    const [count, setCount] = useState(0);
    const [data, setData] = useState<any>();

    useEffect(() => {
        (async () => {
            const res = await sendToContent("GET_VIDEO_ELEMENTS", {
                foo: "bar",
            });

            setData(res);
        })();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCount(x => x + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <p>Videos found on {count}</p>
            <pre>{JSON.stringify(data, null, 4)}</pre>
        </div>
    );
}
