import * as React from "react";

import { GenericShape } from "../genericShape";

export type CircleProps = {
    r: number
};

export class Circle extends GenericShape<CircleProps> {
    render() {
        return this.drawWrapper(
            <circle
                r={this.props.r}
                cx={this.props.r}
                cy={this.props.r}
                fill={this.props.fill}
                style={this.state.style}
            />
        );
    }
}