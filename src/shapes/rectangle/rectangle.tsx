import * as React from "react";

import { GenericShape } from "../genericShape";

export type RectangleProps = {
    width: string
    height: string
};

export class Rectangle extends GenericShape<RectangleProps> {

    handleControlsHooks(x: string) {
        console.log(x, this)
    }

    render() {
        return this.drawWrapper(
            <rect
                width={this.state.width}
                height={this.state.height}
                fill={this.state.fill}
                style={this.state.style}
            />
        )
    }
}