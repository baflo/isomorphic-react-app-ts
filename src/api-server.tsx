import restify from "restify";
import * as apiModule from "./api";

function startServer(createAPI: typeof apiModule.createAPI) {
    const myServer = restify.createServer();

    createAPI(myServer);

    myServer.listen(8080, (err: Error) => {
        console.log("Started server."); // tslint:disable-line

        if (typeof process.send === "function") {
            process.send("ready");
        }
    });

    return myServer;
}

let server = startServer(apiModule.createAPI);

// Configure HMR
if (module.hot) {
    const accept = module.hot.accept;

    // TODO: Find out why root-relative path is necessary in first module
    accept("./src/api/index.tsx", () => {
        server.close(() => {
            server = startServer(require("./api").createAPI);
        });
    });
}
