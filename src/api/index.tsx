import * as fs from "fs-extra";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { AppContainer } from "react-hot-loader";
import { Capture as LoadableCapture } from "react-loadable";
import { StaticRouter } from "react-router";
import restify, { Server } from "restify";

import * as AppRootModule from "../app";
// import * as ErrorViewModule from "./api/views/Error";
import * as MainViewModule from "../api/views/Main";

let { AppRoot } = AppRootModule;
let { MainViewComponent } = MainViewModule;
// let { ErrorViewComponent } = ErrorView;
if ((module as any).hot) {
    const accept = (module as any).hot.accept;

    accept();

    accept("../app", () => {
        AppRoot = require("../app").AppRoot;
    });

    // accept("./server/views/Error", () => {
    //     ErrorViewComponent = require(",./server/views/Error").ErrorViewComponent;
    // });

    accept("../api/views/Main", () => {
        MainViewComponent = require("../api/views/Main").MainViewComponent;
    });
}

// Get information for react-laodable
const { getBundles } = require("react-loadable/webpack"); // tslint:disable-line
const loadableStats = fs.readJSONSync(REACT_LOADABLE_STATS_PATH);

// Create API
export function createAPI(server: Server) {
    const assetsPath = GLOBAL_ASSETS_PATH;

    server.get(/^\/assets\//, restify.plugins.serveStatic({
        appendRequestPath: false,
        default: "index.html",
        directory: assetsPath,
        maxAge: 0,
    }));

    server.get(/\/.*/, async (req, res, next) => {
        const modules: string[] = [];
        let app = "";

        if (GLOBAL_SSR_ENABLED) {
            app = ReactDOMServer.renderToString((
                <AppContainer>
                    <StaticRouter context={{}} location={req.url}>
                        <LoadableCapture report={(moduleName) => modules.push(moduleName)}>
                            <AppRoot />
                        </LoadableCapture>
                    </StaticRouter>
                </AppContainer>
            ));
        }

        const htmlString = ReactDOMServer.renderToStaticMarkup((
            <MainViewComponent
                appString={app}
                extraScripts={getBundles(loadableStats, modules).map((
                    (bundle: { file: string }) => `${PUBLIC_PATH}${bundle.file}`
                ))}
                title="Good Day."
            />
        ));

        res.end(`<!DOCTYPE html>${htmlString}`);
    });

    return server;
}
