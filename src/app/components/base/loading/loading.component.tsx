import React from "react";
import { LoadingComponentProps } from "react-loadable";
import styles from "./loading.component.scss";

export const LoadingComponent = (props: LoadingComponentProps) => {
    if (props.error) {
        return (
            <div className={styles.error}>
                {"Loading failed."}
            </div>
        );
    } else if (props.timedOut) {
        return <div>Taking a long time...</div>;
    } else if (props.pastDelay) {
        return (
            <div className={styles.loading}>
                {"Something's loading."}
            </div>
        );
    } else {
        return null;
    }
};
