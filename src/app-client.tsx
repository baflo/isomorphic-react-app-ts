import React from "react";
import ReactDOM from "react-dom";
import loadable from "react-loadable";
import { BrowserRouter } from "react-router-dom";
import { App } from "./app";

const appNode = document.getElementById("app");

function isPreRendered() {
    return (appNode && appNode.innerHTML !== "") ||
        process.env.NODE_ENV !== "development";
}

function render() {
    if (appNode) {
        const app = (
            <BrowserRouter>
                <App />
            </BrowserRouter>
        );

        if (isPreRendered()) {
            ReactDOM.hydrate(app, appNode);
        } else {
            ReactDOM.render(app, appNode);
        }
    }
}

if (typeof document !== "undefined") {
    document.addEventListener("DOMContentLoaded", async () => {
        if (isPreRendered()) {
            await loadable.preloadReady();
        } else {
            await loadable.preloadAll();
        }

        render();
    });
}
