import * as React from "react";

import { IHTMLWebsiteProps } from "./types";

export class MainViewComponent extends React.Component<IHTMLWebsiteProps> {
    public render() {
        return (
            <html>
                <head>
                    <title>{this.props.title}</title>
                    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
                    <link rel="stylesheet" type="text/css" href="/assets/styles.css" />
                </head>
                <body>
                    <div id={"app"}>
                        {this.props.children}
                    </div>

                    <script src="/assets/app-client.js" />
                </body>
            </html>
        );
    }
}
