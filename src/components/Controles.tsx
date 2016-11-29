
import * as React from "react";
import { Component, MouseEventHandler } from "react";

interface ControlesState {
}

interface ControlesProps extends React.HTMLProps<HTMLCanvasElement>{
  shown: boolean;
}


export default class Controles extends Component<ControlesProps, ControlesState> {


  constructor(props: ControlesProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={{
        width: '100%',
        height: '30px',
        position: 'absolute',
        bottom: 0,
        left: 0,
        opacity: this.props.shown ? 1 : 0,
        transition: 'opacity .25s ease-in-out'
      }}>
        {this.props.children}
      </div>
    )
  }
}