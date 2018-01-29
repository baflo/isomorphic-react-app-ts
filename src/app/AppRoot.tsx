import * as React from "react";
import { WithStylesContext } from "isomorphic-style-loader-utils";
import App from './app-component/app-component';

type AppProps = {
    css: string[];
    state?: any;
}

export default class AppRoot extends React.Component<AppProps, {}> {
    render() {
        return (
            <WithStylesContext onInsertCss={(styles: any) => {
                this.props.css.push(styles._getCss());
            }}>
                <App />
            </WithStylesContext>
        )
    }
}
