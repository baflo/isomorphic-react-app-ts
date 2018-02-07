import fs from "fs-extra";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import loadable, { Capture as LoadableCapture } from "react-loadable";
import { getBundles } from "react-loadable/webpack";
import { StaticRouter } from "react-router";
import { Request } from "restify";

let hasPreloaded = false;
const App = loadable({
    loader: async () => {
        if (!hasPreloaded) {
            await loadable.preloadAll();
            hasPreloaded = true;
        }

        return (await import("../../../app")).App;
    },
    loading: () => null,
});

// Get information for react-loadable
let loadableStats = {};
const tryAndFindLoadableStats = setInterval(() => {
    try {
        loadableStats = fs.readJSONSync(path.join(__dirname, REACT_LOADABLE_STATS_PATH));
        clearInterval(tryAndFindLoadableStats);
    } catch {
        return;
    }
}, 1000);

export const renderApp = (req: Request) => {
    const modules: string[] = [];
    let appString = "";

    appString = ReactDOMServer.renderToString((
        <StaticRouter context={{}} location={req.url}>
            <LoadableCapture report={(mod) => modules.push(mod)}>
                <App />
            </LoadableCapture>
        </StaticRouter>
    ));

    const extraScripts: string[] = [];
    const extraStyles: string[] = [];

    getBundles(loadableStats, modules).forEach((
        (bundle: { file: string }) => {
            if (!bundle) {
                return;
            }

            const url = path.join(PUBLIC_PATH, bundle.file)
                .split(path.sep).join("/");

            switch (path.extname(bundle.file)) {
                case ".css":
                    extraStyles.push(url);
                    return;

                case ".js":
                    extraScripts.push(url);
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
