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
                <svg width={"100%"} height={"100%"}>
                    <S.Circle
                        r={50}
                        x={150}
                        y={0}
                        fill="orange"
                    />
                    <S.Rectangle
                        x={0}
                        y={150}
                        width={100}
                        height={100}
                        fill="red"
                    />
                </svg>
            </div>
        )
    }
}