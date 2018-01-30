import * as React from "react";
import * as fs from "fs";
import * as restify from "restify";
import * as path from "path";
import * as ReactDOMServer from "react-dom/server";

import MainViewComponent from "./views/Main";
// import HTMLWebsiteError from "../client/views/error";

const server = restify.createServer();
const assetsPath = path.join(__dirname, 'assets');

function serveFile(from: string, to: string, contentType?: string) {
    server.get(from, (req, res, next) => {
        fs.readFile(to, function (err, data) {
            if (err) {
                next(err);
                return;
            }

            if (contentType) {
                res.setHeader('Content-Type', contentType);
            }
            res.writeHead(200);
            res.end(data);
            next();
        });
    });
}

serveFile('/libs/client.js', 'bundles/client.js', 'text/html');
serveFile('/libs/styles.js', 'bundles/styles.js', 'text/javascript');
serveFile('/libs/styles.css', 'bundles/styles.css', 'text/css');

server.get(/^\/assets\//, restify.plugins.serveStatic({
    directory: assetsPath,
    default: 'index.html',
    appendRequestPath: false
}));

server.get(/\/.*/, (req, res, next) => {
    const htmlString = ReactDOMServer.renderToString(
        <MainViewComponent title="Good Day!" />
    );

    res.write(htmlString);
    res.end();
});

server.listen(8080);
