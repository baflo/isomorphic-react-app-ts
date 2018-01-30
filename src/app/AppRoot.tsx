import * as React from "react";
import App from './app-component/app-component';

type AppProps = {
    css: string[];
    state?: any;
}

export default class AppRoot extends React.Component<AppProps, {}> {
    render() {
        return (
            <App />
        )
    }
}
