import * as React from "react";

import "./genericShape.less";

export type GenericShapeProps = {
    x?: number
    y?: number
    width: string
    height: string
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

const selectedShape: any = {
    currentSelection: undefined,
    focus: x => {
        if (
            selectedShape.currentSelection !== undefined &&
            x !== selectedShape.currentSelection
        ) {
            selectedShape.currentSelection.setState({ isFocused: false });
        }
        selectedShape.currentSelection = x;
        selectedShape.currentSelection.setState({ isFocused: true });
    }
}

export class GenericShape<P> extends React.Component<
    P & GenericShapeProps,
    GenericShapeState & {
        isMoving?: boolean
        isFocused?: boolean
        style: React.CSSProperties
    }>
{
    ref!: Element | null
    moveTmp: {
        x: number
        y: number
    }

    constructor(props) {
        super(props);

        // state and props have different
        // optional types, this is going around
        // the TS compiler, I should probably
        // open bug about this
        let x1: any = this.props.x || 10;
        let y1: any = this.props.y || 10;

        this.state = {
            x: x1,
            y: y1,
            style: {},
            isMoving: false,
            isFocused: false
        }

        this.moveTmp = { x: 0, y: 0 }
        this.handlerMove = this.handlerMove.bind(this)
        this.handlerClick = this.handlerClick.bind(this)
        this.handlerMoveEnd = this.handlerMoveEnd.bind(this)
        this.handlerMoveStart = this.handlerMoveStart.bind(this)
    }

    handlerClick(e) {
        selectedShape.focus(this);
        e.target.dataset.clickable && console.log(e.target.dataset.clickable);
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
        this.setState({ isMoving: true });
        this.handlerClick(e);
    }

    handlerMoveEnd(e) {
        this.moveTmp = {
            x: 0,
            y: 0
        };
        this.setState({ isMoving: false })
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

    drawWrapper(children) {
        return (
            <div
                ref={n => this.ref = n}
                className={`svg-wrapper ${this.state.isFocused ? "isFocused" : ""}`}
                style={{
                    top: this.state.y,
                    left: this.state.x
                }}>
                <svg
                    width={this.props.width}
                    height={this.props.height}
                >{children}</svg>
                <div className="svg-wrapper-controls">
                    <div className="svg-controls t-controls">
                        <span data-clickable="tl" className="controls-handle l-handle"></span>
                        <span data-clickable="tm" className="controls-handle m-handle"></span>
                        <span data-clickable="tr" className="controls-handle r-handle"></span>
                    </div>
                    <div className="svg-controls m-controls">
                        <span data-clickable="ml" className="controls-handle l-handle"></span>
                        <span data-clickable="mm" className="controls-handle m-handle"></span>
                        <span data-clickable="mr" className="controls-handle r-handle"></span>
                    </div>
                    <div className="svg-controls b-controls">
                        <span data-clickable="bl" className="controls-handle l-handle"></span>
                        <span data-clickable="bm" className="controls-handle m-handle"></span>
                        <span data-clickable="br" className="controls-handle r-handle"></span>
                    </div>
                </div>
            </div>
        );
    }
}