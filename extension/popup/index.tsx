import React from "react";
import ReactDOM from "react-dom/client";
import Main from "./src";
import { MantineProvider } from "@mantine/core";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <React.StrictMode>
        <MantineProvider withGlobalStyles withNormalizeCSS>
            <Main />
        </MantineProvider>
    </React.StrictMode>
);
