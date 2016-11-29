import * as React from 'react';
import {Component} from 'react';

import LinearProgress from 'material-ui/LinearProgress';

interface ProgressBarState{

}

interface ProgressBarProps extends React.HTMLProps<HTMLDivElement>{
  position: number;
  buffer: number;
}

export default class ProgressBar extends Component<ProgressBarProps, ProgressBarState> {

  style: { 
    progress: any; 
    buffer:any;
  } = {
    progress:{
      opacity:.8
    },
    buffer:{
      position:'absolute',
      opacity:.4,
      transform: 'translate(0, -100%)'
    }
  };

  render(){

    
    return (
      <div>
        <LinearProgress color="#FF0000" style={this.style.progress} mode="determinate" value={this.props.position} />
        <LinearProgress color="#0000FF" style={this.style.buffer} mode="determinate" value={this.props.buffer} />
      </div>
    );
  }
}