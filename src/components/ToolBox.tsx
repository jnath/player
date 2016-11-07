
import * as React from "react";
import { Component, MouseEventHandler } from "react";

interface ToolBoxState {
}

interface ToolBoxProps extends React.HTMLProps<HTMLCanvasElement>{
  shown: boolean;
}


export default class ToolBox extends Component<ToolBoxProps, ToolBoxState> {


  constructor(props: ToolBoxProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        opacity: this.props.shown ? 1 : 0,
        transition: 'opacity .25s ease-in-out'
      }}>
        {this.props.children}
      </div>
    )
  }
}