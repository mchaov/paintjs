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
                className="area">
                <S.Circle
                    r={50}
                    x={150}
                    y={0}
                    width={"100px"}
                    height={"100px"}
                    fill="orange"
                />
                <S.Rectangle
                    x={0}
                    y={150}
                    width={"100px"}
                    height={"100px"}
                    fill="blue"
                />
            </div>
        )
    }
}