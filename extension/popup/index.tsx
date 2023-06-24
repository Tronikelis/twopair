import React from "react";
import ReactDOM from "react-dom/client";

function App() {
    return <div>pretty cool</div>;
}

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(<App />);
