import React from "react";
import { HotRootComponent } from "./components/_root/root.component";

interface IAppProps {
    state?: any;
}

export class App extends React.Component<IAppProps, {}> {
    public render() {
        return (
            <HotRootComponent />
        );
    }
}
