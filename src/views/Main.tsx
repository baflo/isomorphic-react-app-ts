import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import { HTMLWebsiteProps } from "./types";
import AppRoot from "../app/AppRoot";

export default class MainViewComponent extends React.Component<HTMLWebsiteProps> {
    css: string[] = [];
    app = (
        <AppRoot css={this.css} />
    );

    render() {
        const renderedApp = ReactDOMServer.renderToString(this.app)

        return (
            <html>
                <head>
                    <title>{this.props.title}</title>
                    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
                    <link rel="stylesheet" type="text/css" href="/libs/styles.css" />
                </head>
                <body>
                    <div id={'app'} dangerouslySetInnerHTML={{ __html: renderedApp }} />

                    <script src="libs/client.js" />
                </body>
            </html>
        )
    }
}
