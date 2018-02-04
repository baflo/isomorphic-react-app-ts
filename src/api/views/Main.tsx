import React from "react";
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
                    <div
                        dangerouslySetInnerHTML={{ __html: this.props.appString }}
                        id={"app"}
                    />

                    <script src="/assets/commons.js" />
                    <script src="/assets/app-root.js" />
                    <script src="/assets/app-client.js" />
                    {
                        this.props.extraScripts!.map((
                            (path) =>
                                <script
                                    key={path}
                                    src={path}
                                />
                        ))
                    }
                    <script dangerouslySetInnerHTML={{ __html: "main();" }} />
                </body>
            </html>
        );
    }
}
