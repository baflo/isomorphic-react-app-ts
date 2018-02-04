import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { preloadReady } from "react-loadable";
import { BrowserRouter } from "react-router-dom";

import { AppRoot } from "./app";

function render(app: React.ReactElement<any>) {
    const appNode = document.getElementById("app");


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
            const app = (
                <AppContainer>
                    <BrowserRouter>
                        <AppRoot />
                    </BrowserRouter>
                </AppContainer>
            );

            render(app);

            // Webpack Hot Module Replacement API
            if ((module as any).hot) {
                (module as any).hot.accept('./app', () => {
                    render(app);
                })
            }
        });
    }
};
