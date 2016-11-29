
import * as React from 'react';
import {Component} from 'react';

import Player from './components/Player';
import Toolbox from './components/Toolbox';
import Controles from './components/Controles';

import Header from './components/Header';
import OverlayControles, { OverlayControlesDisplayState } from './components/OverlayControles';
import PlayPause, { PlayPauseDisplayState } from './components/controles/PlayPause';
import ProgressBar from './components/controles/ProgressBar';
import Volume, { VolumeDisplayState } from './components/controles/Volume';
import Slider from 'material-ui/Slider';

// import LinearProgress from 'material-ui/LinearProgress';
// import PlayArrow from 'material-ui/svg-icons/av/play-arrow';
// import Pause from 'material-ui/svg-icons/av/pause';


interface MainState{
  uiShown?:boolean;
  playing?:boolean;
  currentUrl?: string;
  position?: number;
  buffer?: number;
  volume?: number;
  mute?: boolean;
}

export default class Main extends Component<any, MainState> {

  styles: {player:any; toolbox:any} = {
    player: {

    },
    toolbox: {
      opaciy:1,
      zIndex:3
    }
  };

  private hoverTimeout: NodeJS.Timer = null;

  private player: Player;

  constructor(props) {
    super(props);

    this.state = {
      uiShown: true,
      playing: false,
      currentUrl: 'file:///Users/jnath2/Movies/trailer_1080p.mov',
      position: 0,
      buffer:0,
      volume:1,
      mute:false
    };
    this.hoverTimeout = null;
  }

  hover(){
    if(this.hoverTimeout){
      clearTimeout(this.hoverTimeout);
    }
    this.state.uiShown || this.setState({uiShown: true});
    // this.hoverTimeout = setTimeout(() => {
    //   this.setState({uiShown: false})
    // }, 5000)
  }

  tooglePlayPause(){ 
    this.player.tooglePlayPause(this.state.currentUrl);
  }

  mute(){
    this.player.mute = !this.player.mute;
    this.setState({mute:this.player.mute});
  }

  volume(value: number){
    this.player.volume = value * 100;
    this.setState({ volume: value });
  }

  onEndReached(){
    this.player.position = 0;
  }

  render() {
    return (
      <div onMouseMove={()=>this.hover()}>
        <Player ref={(player) => this.player = player } style={this.styles.player}
          onPositionChanged={(pos: number)=>this.setState({position: pos * 100})}
          onBuffering={(perc: number)=>this.setState({buffer: perc})}
          onPlaying={()=>this.setState({playing:true})}
          onPaused={()=>this.setState({playing:false})}
          onStopped={()=>this.setState({playing:false})}
          onEndReached={()=>this.onEndReached()}
          />
        <Toolbox style={this.styles.toolbox} 
          shown={this.state.uiShown}
          >
            <Header />
            <OverlayControles
              onClick={()=>this.tooglePlayPause()}
              displayState={this.state.playing ? OverlayControlesDisplayState.PAUSE : OverlayControlesDisplayState.PLAY}
              />
          </Toolbox>
          <Controles shown={this.state.uiShown}> 
              <ProgressBar position={this.state.position} buffer={this.state.buffer} />
              <PlayPause style={{display:'inline-block'}}
                onClick={()=>this.tooglePlayPause()}
                displayState={this.state.playing ? PlayPauseDisplayState.PAUSE : PlayPauseDisplayState.PLAY}
              />
              <Volume
                style={{display:'inline-block'}}
                volume={this.state.volume}
                mute={this.state.mute}
                onButtonClick={()=>this.mute()}
                onChange={(e) => this.volume(e)}
                />
          </Controles>
      </div>
    );
  }
}