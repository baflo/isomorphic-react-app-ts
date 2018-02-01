import * as React from "react";
import { ParagraphComponent } from "../paragraph/paragraph.component";
import * as style from "./green-paragraph.component.scss";

export const GreenParagraphComponent = () => (
    <ParagraphComponent className={style.paragraph}>
        {"This is a green paragraph."}
    </ParagraphComponent>
);
