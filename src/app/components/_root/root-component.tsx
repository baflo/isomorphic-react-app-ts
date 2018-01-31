import * as React from "react";
import * as s from "./root-component.scss";
import * as sunny from "./sunny.png";

export default class App extends React.Component<{}, { color: string }> {
    public state = {
        color: "unset",
    };

    constructor(props: {}) {
        super(props);
    }

    public componentDidMount() {
        this.setState({
            color: "red",
        });
    }

    public render() {
        return (
            <div className={"pure-g"}>
                <div className={"pure-u-1 pure-u-md-4-24"} />
                <div className={`pure-u-1 pure-u-md-16-24 ${s.main}`}>
                    <div className={"pure-menu pure-menu-horizontal"}>
                        <a href="#" className={"pure-menu-heading pure-menu-link"}>
                            <img src={sunny} className="pure-img" />
                        </a>

                        <ul className={"pure-menu-list"}>
                            <li className={"pure-menu-item"}>
                                <a href="#" className={"pure-menu-link"}>{"Home"}</a>
                            </li>
                            <li className={"pure-menu-item"}>
                                <a href="#" className={"pure-menu-link"}>{"Test"}</a>
                            </li>
                            <li className={"pure-menu-item"}>
                                <a href="#" className={"pure-menu-link"}>{"Guestbook"}</a>
                            </li>
                        </ul>
                    </div>

                    <section>
                        <h1>
                            {"A test page"}
                        </h1>

                        <div className={s.test}>
                            {"This is some more text"}
                        </div>
                    </section>
                </div>
                <div className={"pure-u-1 pure-u-md-4-24"} />
            </div>
        );
    }
}
