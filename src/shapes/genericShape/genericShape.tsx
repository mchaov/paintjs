import * as React from "react";

export enum GenericPropsMap {
    strokeWidth = "stroke-width"
}

export type GenericShapeProps = {
    height: string,
    width: string
}

export type GenericStyles = {

}

export type GenericShapeSharedProps = {
    fill?: string
    style?: string
    stroke?: string
    strokeWidth?: string
}

export class GenericShape<P, S> extends React.Component<P & GenericShapeProps, S> {
    children!: any

    render() {
        return (
            <svg width={this.props.width} height={this.props.height}>
                {this.children}
            </svg>
        )
    }
}