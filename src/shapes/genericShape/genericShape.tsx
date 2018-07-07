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
            <svg width="100" height="100">
                {this.children}
            </svg>
        )
    }
}