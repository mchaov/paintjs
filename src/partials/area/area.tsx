import * as React from "react";
import { StateStore } from "../../stateStore";

import * as S from "../../shapes";

import "./area.less";

export class Area extends React.Component<
    { store: StateStore },
    { store: StateStore }>
{
    root: HTMLDivElement | null

    constructor(props) {
        super(props);
        this.root = null;
    }

    render() {
        return (
            <div
                ref={n => this.root = n}
                className="area">
                <S.Circle
                    width="100"
                    height="100"
                    r="40"
                    cx="50"
                    cy="50"
                    fill="red"
                />
                <S.Rectangle
                    width="100"
                    height="100"
                    fill="red"
                />
            </div>
        )
    }
}