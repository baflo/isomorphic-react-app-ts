import React from "react";
import ReactDOM from "react-dom";
import { preloadReady } from "react-loadable";
import { BrowserRouter } from "react-router-dom";

import { App } from "./app";

function render() {
    const appNode = document.getElementById("app");

    const app = (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );

    if (appNode) {
        if (
            appNode.innerHTML === "" &&
            typeof process !== "undefined" &&
            process.env &&
            process.env.NODE_ENV === "development"
        ) {
            ReactDOM.render(app, appNode);
        } else {
            ReactDOM.hydrate(app, appNode);
        }
    }
}

(window as any).main = () => {
    if (typeof document !== "undefined") {
        preloadReady().then(() => {
            render();
        });
    }
};
