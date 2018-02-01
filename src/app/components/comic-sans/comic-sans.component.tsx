import * as React from "react";
import * as styles from "./comic-sans.component.scss";

export const ComicSans = (props: { children: React.ReactNode }) => (
    <span className={styles.comical}>
        {props.children}
    </span>
);
