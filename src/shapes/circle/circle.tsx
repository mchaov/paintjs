import * as React from "react";

import { GenericShape, GenericShapeSharedProps } from "../genericShape";

export type CircleProps = {
    r: number
} & GenericShapeSharedProps;

export class Circle extends GenericShape<CircleProps> {
    render() {
        return (
            <circle
                ref={n => this.ref = n}
                r={this.props.r}
                cx={this.props.r + this.state.x}
                cy={this.props.r + this.state.y}
                fill={this.props.fill}
            />
        );
    }
}