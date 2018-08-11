import * as React from "react";

import "./genericShape.less";

export type GenericShapeProps = {
    x?: number
    y?: number
    width: string
    fill: string
    height: string
    stroke: string
    strokeWidth: string
    style: React.CSSProperties
}

export type GenericShapeState = {
    x: number
    y: number
    fill: string
    width: string
    height: string
    stroke: string
    isMoving: boolean
    isFocused: boolean
    strokeWidth: string
    style: React.CSSProperties
}

const selectedShape: any = {
    currentSelection: undefined,
    reset: (x?) => {
        if (
            selectedShape.currentSelection !== undefined &&
            x !== selectedShape.currentSelection
        ) {
            selectedShape.currentSelection.setState({ isFocused: false });
        }
        selectedShape.currentSelection = undefined;
    },
    focus: x => {
        selectedShape.reset(x);
        selectedShape.currentSelection = x;
        selectedShape.currentSelection.setState({ isFocused: true });
    }
}

const controls = {
    tl: "",
    tm: "",
    tr: "",
    ml: "",
    mm: "",
    mr: "",
    bl: "",
    bm: "",
    br: "",
}

const matchControl = x => typeof controls[x] !== "undefined";

export class GenericShape<P> extends React.Component<
    P & GenericShapeProps,
    GenericShapeState
    >
{
    ref!: Element | null
    moveTmp: {
        x: number
        y: number
    }
    resizing: boolean

    constructor(props) {
        super(props);

        // state and props have different
        // optional types, this is going around
        // the TS compiler, I should probably
        // open bug about this
        let x1: any = this.props.x || 10;
        let y1: any = this.props.y || 10;

        this.resizing = false;

        this.state = {
            x: x1,
            y: y1,
            style: {},
            isMoving: false,
            isFocused: false,
            fill: this.props.fill,
            width: this.props.width,
            height: this.props.height,
            stroke: this.props.stroke,
            strokeWidth: this.props.strokeWidth
        }

        this.moveTmp = { x: 0, y: 0 };

        [
            "handleMove",
            "handleMoveEnd",
            "handleMouseDown"
        ].forEach(x => this[x] = this[x].bind(this));
    }

    handleMove(e) {
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

    handleMouseDown(e) {
        let isControl = matchControl(e.target.dataset.clickable);
        selectedShape.focus(this);

        if (!isControl) {
            this.moveTmp = {
                x: e.clientX,
                y: e.clientY
            };
            this.setState({ isMoving: true });
        }

        if (isControl) {

        }
    }

    handleMoveEnd(e) {
        this.moveTmp = {
            x: 0,
            y: 0
        };
        this.setState({ isMoving: false });

        if (
            !e.target.classList.contains("svg-wrapper") &&
            !e.target.classList.contains("controls-handle")
        ) {
            selectedShape.reset();
        }
    }

    componentDidMount() {
        if (this.ref) {
            this.ref.addEventListener("mousedown", this.handleMouseDown)
            document.addEventListener("mousemove", this.handleMove)
            document.addEventListener("mouseup", this.handleMoveEnd)
        }
    }

    componentWillUnmount() {
        if (this.ref) {
            this.ref.removeEventListener("mousedown", this.handleMouseDown)
            document.removeEventListener("mousemove", this.handleMove)
            document.removeEventListener("mouseup", this.handleMoveEnd)
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