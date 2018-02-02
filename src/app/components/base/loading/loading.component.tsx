import React from "react";
import loadable, { OptionsWithRender } from "react-loadable";
import styles from "./loading.component.scss";

const Loading = () => (
    <div className={styles.loading}>
        {"Something's loading."}
    </div>
);

interface ILoadingComponentAsChild {
    children: OptionsWithRender<any, any>["loader"];
}

interface ILoadingComponentAsParameter {
    loader: OptionsWithRender<any, any>["loader"];
}

type ILoadingComponent = ILoadingComponentAsChild | ILoadingComponentAsParameter;

export const LoadingComponent = (props: ILoadingComponent) => {
    const LoadableComponent = loadable({
        loader: (props as ILoadingComponentAsChild).children || (props as ILoadingComponentAsParameter).loader,
        loading: Loading,
    });

    return <LoadableComponent />;
};
