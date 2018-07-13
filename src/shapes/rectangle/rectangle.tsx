import * as React from "react";

import { GenericShape, GenericShapeSharedProps } from "../genericShape";

export type RectangleProps = {
    width: string
    height: string
} & GenericShapeSharedProps;

export class Rectangle extends GenericShape<RectangleProps> {
    render() {
        return this.drawWrapper(
            <rect
                width={this.props.width}
                height={this.props.height}
                fill={this.props.fill}
                style={this.state.style}
            />
        )
    }
}