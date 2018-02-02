import React from "react";
import { ParagraphComponent } from "../paragraph/paragraph.component";

import styles from "./red-paragraph.component.scss";

export const RedParagraphComponent = (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <ParagraphComponent className={styles.paragraph}>
        {"This is a red paragraph."}
    </ParagraphComponent>
);
