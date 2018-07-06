import * as React from "react";
import { offsetSizes } from "../../helpers";
import { StateStore } from "../../stateStore";

import "./area.less";

export class Area extends React.Component<
    { store: StateStore },
    {
        store: StateStore
        canvas: {
            width: number
            height: number
        }
    }>
{
    root: HTMLDivElement | null
    canvas: HTMLCanvasElement | null
    ctx: CanvasRenderingContext2D | null

    constructor(props) {
        super(props);

        this.state = {
            canvas: {
                height: 100,
                width: 100
            },
            store: this.props.store,
        };

        this.canvas = null;
        this.root = null;
        this.ctx = null;

        this.updateCanvasSize = this.updateCanvasSize.bind(this);
    }

    private updateCanvasSize() {
        if (this.root) {
            let o = offsetSizes(this.root);
            this.setState({
                canvas: {
                    width: o.w,
                    height: o.h
                }
            })
        }
    }

    componentDidMount() {
        this.updateCanvasSize();
        window.addEventListener("resize", this.updateCanvasSize, { capture: true, passive: true });
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateCanvasSize, true);
    }

    render() {
        return (
            <div
                ref={n => this.root = n}
                className="area">
                <canvas
                    ref={n => {
                        this.canvas = n;
                        this.ctx = this.canvas && this.canvas.getContext("2d");
                        return n;
                    }}
                    width={this.state.canvas.width}
                    height={this.state.canvas.height}></canvas>
            </div>
        )
    }
}