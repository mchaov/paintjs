import * as React from "react";

export type GenericShapeProps = {
    x?: number
    y?: number
}

export type GenericShapeState = {
    x: number
    y: number
}

export type GenericShapeSharedProps = {
    fill?: string
    style?: string
    stroke?: string
    strokeWidth?: string
}

export class GenericShape<P> extends React.Component<
    P & GenericShapeProps,
    GenericShapeState & { isMoving?: boolean, style: React.CSSProperties }
    >
{
    ref!: Element | null
    moveTmp: {
        x: number
        y: number
    }

    constructor(props) {
        super(props);

        // stave and props have different
        // optional types, this is going around
        // the TS compiler, I should probably
        // open bug about this
        let x1: any = this.props.x || 0;
        let y1: any = this.props.y || 0;

        this.state = {
            isMoving: false,
            x: x1,
            y: y1,
            style: {}
        }

        this.moveTmp = { x: 0, y: 0 }
        this.handlerMove = this.handlerMove.bind(this);
        this.handlerMoveStart = this.handlerMoveStart.bind(this);
        this.handlerMoveEnd = this.handlerMoveEnd.bind(this);
    }

    handlerMove(e) {
        if (this.state.isMoving) {
            this.setState({
                x: this.state.x + e.clientX - this.moveTmp.x,
                y: this.state.y + e.clientY - this.moveTmp.y
            })
            this.moveTmp = {
                x: e.clientX,
                y: e.clientY
            };
        }
    }

    handlerMoveStart(e) {
        this.moveTmp = {
            x: e.clientX,
            y: e.clientY
        };
        this.setState({ isMoving: true, style: { zIndex: 5 } })
    }

    handlerMoveEnd(e) {
        this.moveTmp = {
            x: 0,
            y: 0
        };
        this.setState({ isMoving: false, style: { zIndex: 0 } })
    }

    componentDidMount() {
        if (this.ref) {
            this.ref.addEventListener("mousedown", this.handlerMoveStart)
            document.addEventListener("mousemove", this.handlerMove)
            document.addEventListener("mouseup", this.handlerMoveEnd)
        }
    }

    componentWillUnmount() {
        if (this.ref) {
            this.ref.removeEventListener("mousedown", this.handlerMoveStart)
            document.removeEventListener("mousemove", this.handlerMove)
            document.removeEventListener("mouseup", this.handlerMoveEnd)
        }
    }
}