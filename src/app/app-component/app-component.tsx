import * as React from "react";
import * as s from "./app-component.scss";

type AppProps = {};

export default class App extends React.Component<AppProps, { color: string }> {
    state = {
        color: "unset"
    };

    constructor(props: AppProps) {
        super(props);
    }

    componentDidMount() {
        this.setState({
            color: "red"
        });
    }

    render() {
        return (
            <div className={'pure-g'}>
                <div className={'pure-u-1 pure-u-md-4-24'}></div>
                <div className={'pure-u-1 pure-u-md-16-24'}>
                    <div className={`${s.main}`}>
                        <div className={'pure-menu pure-menu-horizontal'}>
                            <a
                                href="#"
                                className={'pure-menu-heading pure-menu-link'}
                            >
                                <span className={s.test}>
                                    {'BRANDi'}
                                </span>
                            </a>
                            <ul className={'pure-menu-list'}>
                                <li className={'pure-menu-item'}>
                                    <a href="#" className={'pure-menu-link'}>{'Hallo'}</a>
                                </li>
                                <li className={'pure-menu-item'}>
                                    <a href="#" className={'pure-menu-link'}>{'Welt'}</a>
                                </li>
                                <li className={'pure-menu-item'}>
                                    <a href="#" className={'pure-menu-link'}>{'Wie'}</a>
                                </li>
                                <li className={'pure-menu-item'}>
                                    <a href="#" className={'pure-menu-link'}>{'geht'}</a>
                                </li>
                                <li className={'pure-menu-item'}>
                                    <a href="#" className={'pure-menu-link'}>{'es?'}</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={'pure-u-1 pure-u-md-4-24'}></div>
            </div>
        )
    }
}
