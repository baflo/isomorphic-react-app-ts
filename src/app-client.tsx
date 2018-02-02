import React from "react";
import ReactDOM from "react-dom";
import { AppRoot } from "./app";

if (typeof document !== "undefined") {
    const appNode = document.getElementById("app");
    if (appNode) {
        if (typeof process !== "undefined" && process.env && process.env.NODE_ENV === "development") {
            ReactDOM.render(<AppRoot />, appNode);
        } else {
            ReactDOM.hydrate(<AppRoot />, appNode);
        }
    }
}
