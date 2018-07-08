import * as React from "react";

import { GenericShape, GenericPropsMap, GenericShapeSharedProps } from "../genericShape";

export type CircleProps = {
    r: string
    cx: string
    cy: string
} & GenericShapeSharedProps;

export class Circle extends GenericShape<CircleProps, {}> {
    constructor(props) {
        super(
            {
                ...props,
                height: (parseInt(props.r) * 2).toString(),
                width: (parseInt(props.r) * 2).toString()
            }
        );

        this.children = <circle {
            ...Object.keys(this.props)
                .reduce((x, y) => {
                    x[GenericPropsMap[y] || y] = this.props[y];
                    return x;
                }, {})
        } />
    }
}