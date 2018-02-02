import React from "react";
import ReactDOM from "react-dom";
import loadable from "react-loadable";

import { AppRoot } from "./app";

(window as any).main = () => {
    if (typeof document !== "undefined") {
        loadable.preloadReady().then(() => {
            const appNode = document.getElementById("app");

            if (appNode) {
                if (
                    appNode.innerHTML === "" &&
                    typeof process !== "undefined" &&
                    process.env &&
                    process.env.NODE_ENV === "development"
                ) {
                    ReactDOM.render(<AppRoot />, appNode);
                } else {
                    ReactDOM.hydrate(<AppRoot />, appNode);
                }
            }
        });
    }
};
