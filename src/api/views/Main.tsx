import fs from "fs-extra";
import React from "react";
import ReactDOM from "react-dom/server";
import { Capture as LoadableCapture } from "react-loadable";

import { IHTMLWebsiteProps } from "./types";

const { getBundles } = require("react-loadable/webpack"); // tslint:disable-line
const loadableStats = fs.readJSONSync(REACT_LOADABLE_STATS_PATH);

export class MainViewComponent extends React.Component<IHTMLWebsiteProps> {
    public render() {
        const { App } = this.props;
        const modules: string[] = [];
        let app = "";

        if (App) {
            app = ReactDOM.renderToString((
                <LoadableCapture report={(moduleName) => modules.push(moduleName)}>
                    <App />
                </LoadableCapture>
            ));
        }

        return (
            <html>
                <head>
                    <title>{this.props.title}</title>
                    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
                    <link rel="stylesheet" type="text/css" href="/assets/styles.css" />
                </head>
                <body>
                    <div id={"app"} dangerouslySetInnerHTML={{ __html: app }} />

                    <script src="/assets/app-client.js" />
                    {
                        getBundles(loadableStats, modules).map((
                            (bundle: { file: string }) =>
                                <script
                                    key={bundle.file}
                                    src={`${PUBLIC_PATH}${bundle.file}`}
                                />
                        ))
                    }
                    <script dangerouslySetInnerHTML={{ __html: "main();" }} />
                </body>
            </html>
        );
    }
}
