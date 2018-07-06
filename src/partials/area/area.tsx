import * as React from "react";

import { StateStore } from "../../stateStore";

import "./area.less";

export class Area extends React.Component<{ store: StateStore }, { store: StateStore }>{
    constructor(props) {
        super(props);

        this.state = {
            store: this.props.store
        };
    }

    render() {
        return (
            <div className="area">
                area
            </div>
        )
    }
}