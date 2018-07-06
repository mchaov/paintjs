import * as React from "react";

import { StateStore } from "../../stateStore";

import "./menu.less";

export class Menu extends React.Component<{ store: StateStore }, { store: StateStore }>{
    constructor(props) {
        super(props);

        this.state = {
            store: this.props.store
        };
    }

    render() {
        return (
            <div className="menu">
                menu
            </div>
        )
    }
}