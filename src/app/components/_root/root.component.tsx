import React from "react";
import loadable from "react-loadable";
import { Route, Switch, RouteComponentProps } from "react-router";
import { NavLink } from "react-router-dom";

import responsiveImage from "./responsive.jpg";
import styles from "./root.component.scss";

import { LoadingComponent } from "../base/loading/loading.component";
import { ResponsiveImage } from "../base/responsive-image/responsive-image.component";
import { GreenParagraphComponent } from "../green-paragraph/green-paragraph.component";
import { RedParagraphComponent } from "../red-paragraph/red-paragraph.component";

const Comical = loadable({
    loader: () => import("../comical/comical.component").then((p) => p.Comical),
    loading: LoadingComponent,
});

export default class App extends React.Component<{}, { color: string }> {
    constructor(props: {}) {
        super(props);
    }

    public render() {
        return (
            <div className={"pure-g"}>
                <div className={"pure-u-1 pure-u-md-4-24"} />
                <div className={`pure-u-1 pure-u-md-16-24 ${styles.main}`}>
                    <div className={"pure-menu pure-menu-horizontal"}>
                        <NavLink to="/" className={"pure-menu-heading pure-menu-link"}>
                            <ResponsiveImage {...require("./sunny.png?size=30")} />
                        </NavLink>

                        <ul className={"pure-menu-list"}>
                            <li className={"pure-menu-item"}>
                                <NavLink to="/Home" className={"pure-menu-link"}>{"Home"}</NavLink>
                            </li>
                            <li className={"pure-menu-item"}>
                                <NavLink to="/Test" className={"pure-menu-link"}>{"Test"}</NavLink>
                            </li>
                            <li className={"pure-menu-item"}>
                                <NavLink to="/Guestbook" className={"pure-menu-link"}>{"Guestbook"}</NavLink>
                            </li>
                        </ul>
                    </div>

                    <section>
                        <Switch>
                            <Route path="/:name" component={(props: RouteComponentProps<any>) => (
                                <div>{props.match.params.name}</div>
                            )} />
                        </Switch>
                    </section>

                    <section>
                        <h1>
                            {"A test page"}
                        </h1>

                        <RedParagraphComponent />
                        <GreenParagraphComponent />
                    </section>

                    <section>
                        <Comical>
                            {"Hallo Welt"}
                        </Comical>
                    </section>

                    <section style={{ textAlign: "center" }}>
                        <div style={{ display: "inline-block", maxWidth: "500px" }}>
                            <ResponsiveImage {...responsiveImage} />
                        </div>
                    </section>
                </div>
                <div className={"pure-u-1 pure-u-md-4-24"} />
            </div>
        );
    }
}
