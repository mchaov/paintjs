import * as React from "react";

import { GenericShape, GenericShapeSharedProps } from "../genericShape";

export type RectangleProps = {
    width: number
    height: number
} & GenericShapeSharedProps;

export class Rectangle extends GenericShape<RectangleProps> {
    render() {
        return (
            <rect
                ref={n => this.ref = n}
                width={this.props.width}
                height={this.props.height}
                x={this.state.x}
                y={this.state.y}
                fill={this.props.fill}
            />
        )
    }
}