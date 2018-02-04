import restify from "restify";
import loadable from "react-loadable";

import * as apiModule from "./api";

let { createAPI } = apiModule;
if ((module as any).hot) {
    const accept = (module as any).hot.accept;

    accept("./api", () => {
        createAPI = require("./api").createAPI;
    });
}

loadable.preloadAll().then(() => {
    const server = restify.createServer();

    createAPI(server);

    server.listen(8080, (err: Error) => {
        console.log("Started server."); // tslint:disable-line
    });
})
    .catch((error) => {
        console.error("Failed to preload components:", error); // tslint:disable-line
    });
