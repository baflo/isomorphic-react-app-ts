import path from "path";
import restify, { Server } from "restify";
import * as RouteAppModule from "./routes/app";

let { getApp } = RouteAppModule;
if (module.hot) {
    const accept = module.hot.accept;

    accept("./routes/app", () => {
        getApp = require("./routes/app").getApp;
    });
}

// Create API
export function createAPI(server: Server) {
    server.get(/^\/assets\//, restify.plugins.serveStatic({
        appendRequestPath: false,
        default: "index.html",
        directory: path.join(__dirname, GLOBAL_ASSETS_PATH),
        maxAge: 0,
    }));

    server.get(/\/.*/, (req, res, next) => getApp(req, res, next));

    return server;
}
