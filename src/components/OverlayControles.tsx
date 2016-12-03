
import * as React from 'react';
import {Component} from 'react';

import PlayCircleFilled from 'material-ui/svg-icons/av/play-circle-filled';
import PlayCircleOutline from 'material-ui/svg-icons/av/play-circle-outline';
import PauseCircleFilled from 'material-ui/svg-icons/av/pause-circle-filled';
import PauseCircleOutline from 'material-ui/svg-icons/av/pause-circle-outline';
import Replay from 'material-ui/svg-icons/av/replay';


interface OverlayControlesState{
  visible?:boolean
  over?:boolean
}

interface OverlayControlesProps extends React.HTMLProps<HTMLDivElement>{
  displayState:OverlayControlesDisplayState;
  hiddenTimer:number;
  enableHiddenTimer: boolean;
}

export enum OverlayControlesDisplayState{
  PLAY,
  PAUSE,
  REPLAY
}

export default class OverlayControles extends Component<OverlayControlesProps, OverlayControlesState> {

  private timeout: NodeJS.Timer;

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
      visible:true,
      over:false
    };
  
  }

  mouseOver(){
    this.setState({over:true})
    if(this.timeout){
      clearTimeout(this.timeout);
    }
    this.setState({ visible: true });
  }

  mouseLeave(){
    this.setState({over:false})
    if(this.props.hiddenTimer && this.props.hiddenTimer > 0){
      this.timeout = setTimeout(() => {
        this.setState({ visible: false });    
      }, this.props.hiddenTimer);
    }
  }

  render() {

    let OverlayIco;

    if(!this.props.enableHiddenTimer){
      if(this.timeout){
        clearTimeout(this.timeout);
      }
      this.state.visible = true;
    }

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
    this.style.opacity = this.state.visible ? '1':'0';
    return (
          <OverlayIco 
            style={this.style}
            onMouseOver={()=>this.mouseOver()} 
            onMouseLeave={()=>this.mouseLeave()}
            onClick={(e)=>this.props.onClick(e)} />
    );
  }
}