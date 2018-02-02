import React from "react";
import styles from "./comical.component.scss";

export const Comical = (props: { children: React.ReactNode }) => (
    <span className={styles.comical}>
        {props.children}
    </span>
);
