import React from "react";
import { ParagraphComponent } from "../paragraph/paragraph.component";
import style from "./green-paragraph.component.scss";

export const GreenParagraphComponent = () => (
    <ParagraphComponent className={style.paragraph}>
        {"This is a green paragraph."}
    </ParagraphComponent>
);
