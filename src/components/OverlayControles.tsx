
import * as React from 'react';
import {Component} from 'react';

import PlayCircleFilled from 'material-ui/svg-icons/av/play-circle-filled';
import PauseCircleFilled from 'material-ui/svg-icons/av/pause-circle-filled';


interface OverlayControlesState{

}

interface OverlayControlesProps extends React.HTMLProps<HTMLDivElement>{
  displayState:DisplayState
}

export enum DisplayState{
  PLAY,
  PAUSE
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

    this.state = {};
  
  }

  render() {
    let playStyle:any = Object.assign({}, this.style);
    let pauseStyle:any = Object.assign({}, this.style);
    switch(this.props.displayState){
      case DisplayState.PLAY:
        playStyle.opacity = playStyle.opacity; 
        pauseStyle.opacity = 0; 
      break;
      case DisplayState.PAUSE:
        playStyle.opacity = 0; 
        pauseStyle.opacity = pauseStyle.opacity; 
      break;
      default:
        playStyle.opacity = 0; 
        pauseStyle.opacity = 0; 
      break;
    }
    return (
      <div onClick={(e)=>this.props.onClick(e)} >
        <PlayCircleFilled style={playStyle} />
        <PauseCircleFilled style={pauseStyle} />
      </div>
    );
  }
}