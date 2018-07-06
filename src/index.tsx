import * as React from "react";
import * as ReactDOM from "react-dom";

import { Area, Menu } from "./partials";
import { stateStore } from "./stateStore";

import "./index.less";

ReactDOM.render(
    <div className="layout">
        <Menu store={stateStore} />
        <Area store={stateStore} />
    </div>,
    document.getElementById("paintjs")
);