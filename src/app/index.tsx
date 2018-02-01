import * as React from "react";
import App from "./components/_root/root.component";

interface IAppProps {
    state?: any;
}

export class AppRoot extends React.Component<IAppProps, {}> {
    public render() {
        return (
            <App />
        );
    }
}
