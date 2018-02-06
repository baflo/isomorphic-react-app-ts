import React from "react";
import ReactDOMServer from "react-dom/server";
import { RequestHandler } from "restify";

// import * as ErrorViewModule from "../../../api/views/Error";
import * as MainViewModule from "../../../api/views/Main";
import * as RenderAppModule from "./render-app";

let { renderApp } = RenderAppModule;
let { HotMainViewComponent } = MainViewModule;
// let { HotErrorViewComponent } = ErrorView;
if (module.hot) {
    const accept = module.hot.accept;

    // accept("../../../api/views/Error", () => {
    //     HotErrorViewComponent = require("./../../apiserver/views/Error").HotErrorViewComponent;
    // });

    accept("../../../api/views/Main", () => {
        HotMainViewComponent = require("../../../api/views/Main").HotMainViewComponent;
    });

    accept("./render-app", () => {
        renderApp = require("./render-app").renderApp;
    });
}

export const getApp: RequestHandler = async (req, res, next) => {
    const renderedData = renderApp(req);

    const htmlString = ReactDOMServer.renderToStaticMarkup((
        <HotMainViewComponent
            title="Good Day."
            {...renderedData}
        />
    ));

    res.end(`<!DOCTYPE html>${htmlString}`);
};
