// import * as fs from "fs";
import React from "react";
import ReactDOMServer from "react-dom/server";
import loadable from "react-loadable";
import restify from "restify";

import { AppRoot } from "./app";

// import * as ErrorView from "./api/views/Error";
import * as MainView from "./api/views/Main";

let { MainViewComponent } = MainView;
// let { ErrorViewComponent } = ErrorView;
if ((module as any).hot) {
    // (module as any).hot.accept("./server/views/Error", () => {
    //     ErrorViewComponent = require("./server/views/Error").ErrorViewComponent;
    // });

    (module as any).hot.accept("./api/views/Main", () => {
        MainViewComponent = require("./api/views/Main").MainViewComponent;
    });
}

function createAPIServer() {
    const server = restify.createServer();
    const assetsPath = GLOBAL_ASSETS_PATH;

    server.get(/^\/assets\//, restify.plugins.serveStatic({
        appendRequestPath: false,
        default: "index.html",
        directory: assetsPath,
        maxAge: 0,
    }));

    server.get(/\/.*/, async (req, res, next) => {
        const htmlString = ReactDOMServer.renderToString((
            <MainViewComponent
                title="Good Day."
                App={GLOBAL_SSR_ENABLED ? AppRoot : undefined}
            />
        ));

        res.end(`<!DOCTYPE html>${htmlString}`);
    });

    return server;
}

loadable.preloadAll().then(() => {
    createAPIServer().listen(8080, (err: Error) => {
        console.log("Started server."); // tslint:disable-line
    });
})
    .catch((error) => {
        console.error("Failed to preload components:", error); // tslint:disable-line
    });
