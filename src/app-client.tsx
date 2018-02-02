import React from "react";
import ReactDOM from "react-dom";
import loadable from "react-loadable";
import { BrowserRouter } from "react-router-dom";

import { AppRoot } from "./app";

(window as any).main = () => {
    if (typeof document !== "undefined") {
        loadable.preloadReady().then(() => {
            const appNode = document.getElementById("app");
            const app = (
                <BrowserRouter>
                    <AppRoot />
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
        });
    }
};
