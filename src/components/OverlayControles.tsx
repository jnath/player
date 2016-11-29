
import * as React from 'react';
import {Component} from 'react';

import PlayCircleFilled from 'material-ui/svg-icons/av/play-circle-filled';
import PauseCircleFilled from 'material-ui/svg-icons/av/pause-circle-filled';


interface OverlayControlesState{

}

interface OverlayControlesProps extends React.HTMLProps<HTMLDivElement>{
  displayState:OverlayControlesDisplayState
}

export enum OverlayControlesDisplayState{
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
    return (
      <div onClick={(e)=>this.props.onClick(e)} >
        {this.props.displayState === OverlayControlesDisplayState.PLAY ?
          <PlayCircleFilled style={this.style} />
          :
          <PauseCircleFilled style={this.style} />
        }
      </div>
    );
  }
}