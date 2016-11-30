import * as React from 'react';
import {Component} from 'react';

import LinearProgress from 'material-ui/LinearProgress';
import Slider from 'material-ui/Slider';

interface ProgressBarState{

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
  } = {
    progress:{
      position: 'absolute',
      width: '100%'
    },
    buffer:{
      position:'absolute',
      opacity:.4,
      transform: 'translate(0, -100%)'
    }
  };

  render(){
    
        // <LinearProgress color="#FF0000" style={this.style.progress} mode="determinate" value={this.props.position} />
    return (
      <div>
        <LinearProgress color="#0000FF" style={this.style.buffer} mode="determinate" value={this.props.buffer} />
        <Slider 
          style={this.style.progress} 
          value={this.props.position}
          onChange={(e, v) => this.changedPosition = v}
          onDragStop={(e)=>this.props.onSeek(this.changedPosition)}
          sliderStyle={{
            bottom: '11px',
            height: '0px',
            marginTop: '0px',
            marginBottom: '0px',
            opacity: .5
          }} />
      </div>
    );
  }
}