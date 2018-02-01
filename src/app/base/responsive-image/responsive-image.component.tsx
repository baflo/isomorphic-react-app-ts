import * as React from "react";

export const ResponsiveImage = (props: IResponsiveImageProps) => (
    // From https://github.com/herrstucki/responsive-loader
    <div style={{
        height: props.height,
        width: props.width,
        backgroundSize: 'cover',
        backgroundImage: 'url("' + props.placeholder + '")'
    }}>
        <img
            src={props.src}
            srcSet={props.srcSet}
            style={{
                maxWidth: "100%",
                maxHeight: "100%",
            }}
        />
    </div>
);
