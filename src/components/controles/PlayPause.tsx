
import * as React from 'react';
import {Component} from 'react';

import PlayArrow from 'material-ui/svg-icons/av/play-arrow';
import Pause from 'material-ui/svg-icons/av/pause';

interface PlayPauseState{

}

interface PlayPauseProps extends React.HTMLProps<HTMLDivElement>{
  displayState:PlayPauseDisplayState
}

export enum PlayPauseDisplayState{
  PLAY,
  PAUSE
}

export default class PlayPause extends Component<PlayPauseProps, PlayPauseState> {

  constructor(props) {
    super(props);

    this.state = {};
  
  }

  render() {
    return (
      <div style={this.props.style} onClick={(e)=>this.props.onClick(e)} >
        {this.props.displayState === PlayPauseDisplayState.PLAY ?
          <PlayArrow/>
          :
          <Pause/>
        }
      </div>
    );
  }
}