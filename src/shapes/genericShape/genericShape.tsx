import * as React from "react";

export type GenericShapeProps = {
    height: string,
    width: string
}

export class GenericShape<P, S> extends React.Component<P & GenericShapeProps, S> {
    children!: any

    test() {
        console.log("mashala")
    }

    render() {
        return (
            <svg width={this.props.width} height={this.props.height}>
                {this.children}
            </svg>
        )
    }
}