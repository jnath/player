import * as React from 'react';
import {Component} from 'react';

import LinearProgress from 'material-ui/LinearProgress';
import Slider from 'material-ui/Slider';

interface ProgressBarState{
  over?:boolean;
  mousePose?:number;
}

interface ProgressBarProps extends React.HTMLProps<HTMLDivElement>{
  position: number;
  buffer: number;
  onSeek?: (pos: number) => void;
}

export default class ProgressBar extends Component<ProgressBarProps, ProgressBarState> {

  changedPosition: number;

  style: { 
    progress: any; 
    buffer:any;
    over:any;
  } = {
    progress:{
      position:'absolute',
      height:'inherit',
      borderRadius:'0px',
      backgroundColor:'rgba(255, 255, 255, 0)'
    },
    buffer:{
      position:'absolute',
      height:'inherit',
      borderRadius:'0px',
      backgroundColor:'rgba(255, 255, 255, 0.5)'
    },
    over:{
      position:'absolute',
      height:'inherit',
      borderRadius:'0px',
      backgroundColor:'rgba(255, 255, 255, 0.5)'
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      over:false,
      mousePose:0
    }
  }

  mouseOver(){
    this.setState({over:true});
  }

  mouseLeave(){
    this.setState({
      over:false,
      mousePose : 0
    });
  }

  mouseMove(e: React.MouseEvent<HTMLDivElement>){
    let position = ( ( e.clientX - e.currentTarget['offsetLeft'])  / e.currentTarget['offsetWidth'] );
    this.setState({ mousePose: position});
  }

  mouseDown(e: React.MouseEvent<HTMLDivElement>){
    this.mouseMove(e);
    this.props.onSeek(this.state.mousePose);
  }

  render(){
        // <Slider 
        //   style={this.style.progress} 
        //   value={this.props.position}
        //   onChange={(e, v) => this.changedPosition = v}
        //   onDragStop={(e)=>this.props.onSeek(this.changedPosition)}
        //   sliderStyle={{
        //     bottom: '11px',
        //     height: '0px',
        //     marginTop: '0px',
        //     marginBottom: '0px',
        //     opacity: .5
        //   }} />
    return (
      <div 
        style={{
          // position:'absolute',
          // height: this.state.over ? '6px' : '4px',
          // transform:'translate(0, -50%)',
          // transition: 'height .25s linear'
          width: '98%',
          margin: 'auto',
          height: '4px',
          top:'0px',
          padding:'4px 0px',
          opacity:this.state.over ? .8 : .6,
        }}
        onMouseOver={()=>this.mouseOver()}
        onMouseLeave={()=>this.mouseLeave()}
        >
        <div style={{
          height:'inherit',
          width:'100%',    
          transition: 'all 200ms ease-in',
          transform: `scale(1,${this.state.over ? 1.5 : 1})`
        }}
        onMouseMove={(e)=>this.mouseMove(e)}
        onMouseDown={(e)=>this.mouseDown(e)}
        >
        <LinearProgress color="#EEEEEE" style={this.style.buffer} mode="determinate" value={this.props.buffer} />
        <LinearProgress color="#666666" max={1} style={this.style.over} mode="determinate" value={this.state.mousePose} />
        <LinearProgress color="#f12b24" max={1} style={this.style.progress} mode="determinate" value={this.props.position} />
        </div>
        <div style={{
          position:'absolute',
          top:'0px',
          left:`${ this.props.position * 98 }%`,
          backgroundColor: '#f12b24',
          height: '13px',
          width: '13px',
          borderRadius: '6.5px',
          transition: 'left 0.3s linear 0ms, transform .1s cubic-bezier(0.4,0.0,1,1)',
          transform: `scale(${this.state.over ? 1 : 0})`
        }}
        ></div>
      </div>
    );
  }
}