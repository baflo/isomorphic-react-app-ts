import loadable from "react-loadable";
import restify, { Server } from "restify";

import * as apiModule from "./api";

let { createAPI } = apiModule;
if (module.hot) {
    const accept = module.hot.accept;

    // TODO: Find out why root-relative path is necessary in first module
    accept("./src/api/index.tsx", () => {
        createAPI = require("./api").createAPI;

        server.close(() => {
            startServer();
        });
    });

    startServer();
}

let server: Server;
function startServer() {
    loadable.preloadAll().then(() => {
        server = restify.createServer();

        createAPI(server);

        server.listen(8080, (err: Error) => {
            console.log("Started server."); // tslint:disable-line

            if (typeof process.send === "function") {
                process.send("ready");
            }
        });
    })
        .catch((error) => {
            console.error("Failed to preload components:", error); // tslint:disable-line
        });
}
