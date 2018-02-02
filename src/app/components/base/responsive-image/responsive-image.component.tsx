import React from "react";

export const ResponsiveImage = (props: IResponsiveImageProps) => (
    // From https://github.com/herrstucki/responsive-loader
    <div style={{
        backgroundImage: `url("${props.placeholder}")`,
        backgroundSize: "cover",
        height: props.height,
        width: props.width,
    }}>
        <img
            src={props.src}
            srcSet={props.srcSet}
            style={{
                maxHeight: "100%",
                maxWidth: "100%",
            }}
        />
    </div>
);
