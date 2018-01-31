import * as React from "react";
import { IHTMLWebsiteProps } from "./types";

export class ErrorViewComponent extends React.Component<IHTMLWebsiteProps> {
    public render() {
        return (
            <html>
                <head>
                    <title>{this.props.title}</title>
                    <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
                </head>
                <body>
                    {"Hallo Welt"}
                </body>
            </html>
        );
    }
}
