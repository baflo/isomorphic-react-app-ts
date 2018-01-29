import * as React from "react";
import * as fs from "fs";
import * as restify from "restify";
import * as path from "path";
import * as ReactDOMServer from "react-dom/server";

import MainViewComponent from "./views/Main";
// import HTMLWebsiteError from "../client/views/error";

const server = restify.createServer();
const assetsPath = path.join(__dirname, 'assets');

server.get('/libs/client.js', (req, res, next) => {
    fs.readFile('bundles/client.js', function (err, data) {
        if (err) {
            next(err);
            return;
        }

        res.setHeader('Content-Type', 'text/html');
        res.writeHead(200);
        res.end(data);
        next();
    });
});

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
