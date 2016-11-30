
import * as React from "react";
import { Component, MouseEventHandler } from "react";

interface ControlesState {
  open:boolean;
}

interface ControlesProps extends React.HTMLProps<HTMLCanvasElement>{
  shown?: boolean;
}


export default class Controles extends Component<ControlesProps, ControlesState> {

  private timeout: NodeJS.Timer;

  constructor(props: ControlesProps) {
    super(props);
    this.state = {
      open: true
    };
  }

  mouseOver(){
    if(this.timeout){
      clearTimeout(this.timeout);
    }
    this.setState({ open: true });
  }

  mouseLeave(){
    this.timeout = setTimeout(() => {
      this.setState({ open: false });    
    }, 2000);
  }

  render() {
    return (
      <div 
        onMouseOver={()=>this.mouseOver()} 
        onMouseLeave={()=>this.mouseLeave()} 
        style={{
          width: '100%',
          height: this.state.open ? '30px' : '4px',
          position: 'absolute',
          bottom: 0,
          left: 0,
          opacity: this.props.shown ? 1 : 0,
          transition: 'height .5s cubic-bezier(0.42, 0, 0.9, 1.02)'
        }}>
        {this.props.children}
      </div>
    )
  }
}