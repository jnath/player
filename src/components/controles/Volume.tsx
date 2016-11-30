
import * as React from 'react';
import {Component} from 'react';

import VolumeDown from 'material-ui/svg-icons/av/volume-down';
import VolumeUp from 'material-ui/svg-icons/av/volume-up';
import VolumeMute from 'material-ui/svg-icons/av/volume-mute';
import VolumeOff from 'material-ui/svg-icons/av/volume-off';
import Slider from 'material-ui/Slider';


interface VolumeState{
  over: boolean;
}

interface VolumeProps extends React.HTMLProps<HTMLDivElement>{
  // displayState: VolumeDisplayState;
  volume: number;
  mute?: boolean;
  onButtonClick?: () => void;
  onChange?: (e) => void;
}

export enum VolumeDisplayState{
  DOWN,
  UP,
  MUTE,
  OFF
}

export default class Volume extends Component<VolumeProps, VolumeState> {

  private slider: Slider;

  private timeout: NodeJS.Timer;

  constructor(props) {
    super(props);

    this.state = {
      over:false
    };
  
  }

  mouseOver(){
    // clearTimeout(this.timeout);
    // this.timeout = setTimeout(()=>{
    //   this.setState({over: false});
    // }, 3000);
    this.setState({over: true})
  }

  mouseLeave(){
    this.setState({over: false})
  }

  render() {
    
    let VolumeIco;

    if(this.props.mute){      
        VolumeIco = VolumeMute;
    }else{
      if(this.props.volume === 0){
        VolumeIco = VolumeOff;
      }else if(this.props.volume > .5){
        VolumeIco = VolumeUp;
      }else if(this.props.volume > 0){
        VolumeIco = VolumeDown;
      }
    }
    
    let sliderWidth: string = this.state.over ? '100px' : '0px';

    return (
      <div 
        style={this.props.style} 
        onMouseOut={()=>this.mouseOver()}
        onMouseLeave={()=>this.mouseLeave()}
        >
        <VolumeIco 
          style={{display:'inline-block'}}
          onClick={()=>this.props.onButtonClick()}
          
          />
        <Slider
          ref={(slider) => this.slider = slider}
          value={this.props.volume}
          onChange={(e, value) => this.props.onChange(value)}
          style={{
            display: 'inline-block', 
            width: sliderWidth, 
            height: '24px',
            transition: 'width 1s linear',
            overflow: 'auto'
          }} 
          sliderStyle={{marginTop:'3px', marginBottom:"0px", marginLeft:'6px', width:'calc(100% - 23px)'}} />
      </div>
    );
  }
}