import * as React from "react";

import { GenericShape } from "../genericShape";

export type CircleProps = {
    cx: string
    cy: string
    r: string
    stroke?: string
    strokeWidth?: string
    fill?: string
}

enum CirclePropsMap {
    strokeWidth = "stroke-width"
}

export class Circle extends GenericShape<CircleProps, {}> {
    constructor(props) {
        super(props);

        this.children = <circle {
            ...Object.keys(this.props)
                .reduce((x, y) => {
                    x[CirclePropsMap[y] || y] = this.props[y];
                    return x;
                }, {})
        } />
    }
}