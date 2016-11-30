
import * as React from 'react';
import {Component} from 'react';

import PlayCircleFilled from 'material-ui/svg-icons/av/play-circle-filled';
import PlayCircleOutline from 'material-ui/svg-icons/av/play-circle-outline';
import PauseCircleFilled from 'material-ui/svg-icons/av/pause-circle-filled';
import PauseCircleOutline from 'material-ui/svg-icons/av/pause-circle-outline';
import Replay from 'material-ui/svg-icons/av/replay';


interface OverlayControlesState{
  over:boolean
}

interface OverlayControlesProps extends React.HTMLProps<HTMLDivElement>{
  displayState:OverlayControlesDisplayState
}

export enum OverlayControlesDisplayState{
  PLAY,
  PAUSE,
  REPLAY
}

export default class OverlayControles extends Component<OverlayControlesProps, OverlayControlesState> {

  style: any = {
    width: '100px',
    height: '100px',
    opacity: 0.5,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    cursor: 'pointer'
  };

  constructor(props) {
    super(props);

    this.state = {
      over:false
    };
  
  }

  mouseOver(){
    this.setState({over:true})
  }

  mouseLeave(){
    this.setState({over:false})
  }

  render() {

    let OverlayIco;

    switch(this.props.displayState ){
      case OverlayControlesDisplayState.PLAY:
        OverlayIco = this.state.over ? PlayCircleFilled : PlayCircleOutline;
      break;
      case OverlayControlesDisplayState.PAUSE:
        OverlayIco = this.state.over ? PauseCircleFilled : PauseCircleOutline;
      break;
      case OverlayControlesDisplayState.REPLAY:
        OverlayIco = Replay;
      break;
    }
    
    return (
          <OverlayIco 
            style={this.style}
            onMouseOver={()=>this.mouseOver()} 
            onMouseLeave={()=>this.mouseLeave()}
            onClick={(e)=>this.props.onClick(e)} />
    );
  }
}