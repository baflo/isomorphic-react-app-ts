import fs from "fs-extra";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import loadable, { Capture as LoadableCapture } from "react-loadable";
import { StaticRouter } from "react-router";
import { Request } from "restify";

// Get information for react-laodable
const { getBundles } = require("react-loadable/webpack"); // tslint:disable-line
const loadableStats =
    fs.readJSONSync(path.join(__dirname, REACT_LOADABLE_STATS_PATH));

// Load app only if SSR is enabled. This is especially for development.
const App = loadable({
    loader: () => {
        if (GLOBAL_SSR_ENABLED) {
            return import("../../../app").then((mod) => mod.App);
        } else {
            return Promise.resolve<React.ComponentType>(() => null);
        }
    },
    loading: () => null,
});

export const renderApp = (req: Request) => {
    const modules: string[] = [];
    let appString = "";

    if (GLOBAL_SSR_ENABLED) {
        appString = ReactDOMServer.renderToString((
            <StaticRouter context={{}} location={req.url}>
                <LoadableCapture report={(mod) => modules.push(mod)}>
                    <App />
                </LoadableCapture>
            </StaticRouter>
        ));
    }

    const extraScripts: string[] = [];
    const extraStyles: string[] = [];

    getBundles(loadableStats, modules).forEach((
        (bundle: { file: string }) => {
            if (!bundle) {
                return;
            }

            switch (path.extname(bundle.file)) {
                case ".css":
                    extraStyles.push(path.join(PUBLIC_PATH, bundle.file));
                    return;

                case ".js":
                    extraScripts.push(path.join(PUBLIC_PATH, bundle.file));
                    return;
            }
        }
    ));

    return {
        appString,
        extraScripts,
        extraStyles,
    };
};
