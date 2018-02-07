import React from "react";
import loadable from "react-loadable";

// Load app always in browser, but on server only if SSR is enabled.
// This is especially helpful for development performance.
const HotRootComponent = loadable({
    loader: () => {
        if (typeof window !== "undefined" || GLOBAL_SSR_ENABLED) {
            return import("./components/_root/root.component")
                .then((mod) => mod.HotRootComponent);
        } else {
            return Promise.resolve<React.ComponentType>(() => null);
        }
    },
    loading: () => null,
});

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
