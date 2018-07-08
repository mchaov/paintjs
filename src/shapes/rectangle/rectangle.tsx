import * as React from "react";

import { GenericShape, GenericPropsMap, GenericShapeSharedProps } from "../genericShape";

export type RectangleProps = {} & GenericShapeSharedProps;

export class Rectangle extends GenericShape<RectangleProps, {}> {
    constructor(props) {
        super(props);

        this.children = <rect {
            ...Object.keys(this.props)
                .reduce((x, y) => {
                    x[GenericPropsMap[y] || y] = this.props[y];
                    return x;
                }, {})
        } />
    }
}