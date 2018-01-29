import * as React from 'react';
import { HTMLWebsiteProps } from './types';

export default class ErrorViewComponent extends React.Component<HTMLWebsiteProps> {
    render() {
        return (
            <html>
                <head>
                    <title>{this.props.title}</title>
                    <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
                </head>
                <body>
                    {'Hallo Welt'}
                </body>
            </html>
        )
    }
}
