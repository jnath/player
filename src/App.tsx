
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
  uiShownToolBox?:boolean;
  uiShownControle?:boolean;
  playing?:boolean;
  ended?:boolean;
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

  private tooleBoxTimeout: NodeJS.Timer = null;
  private controlesTimeout: NodeJS.Timer = null;

  private player: Player;

  constructor(props) {
    super(props);

    this.state = {
      uiShownToolBox: true,
      playing: false,
      ended: false,
      currentUrl: 'file:///Users/jnath2/Movies/trailer_1080p.mov',
      position: 0,
      buffer:0,
      volume:1,
      mute:false
    };
    this.controlesTimeout = null;
  }

  mouseMove(){
    if(this.controlesTimeout){
      clearTimeout(this.controlesTimeout);
    }
    this.state.uiShownControle || this.setState({uiShownControle: true});
    this.controlesTimeout = setTimeout(() => {
      this.setState({uiShownControle: false})
    }, 10000);

    if(this.tooleBoxTimeout){
      clearTimeout(this.tooleBoxTimeout);
    }
    this.state.uiShownToolBox || this.setState({uiShownToolBox: true});
    this.tooleBoxTimeout = setTimeout(() => {
      this.setState({uiShownToolBox: false})
    }, 5000);
  }

  tooglePlayPause(){ 
    this.player.tooglePlayPause(this.state.currentUrl);
    this.setState({
      ended: false
    })
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
    this.setState({
      position: 0,
      buffer: 0,
      playing: false,
      ended: true
    });
  }

  seeking(position: number){
    this.player.position = position;
  }

  render() {
    let overlayState: OverlayControlesDisplayState = OverlayControlesDisplayState.PLAY;
    if(this.state.playing){
      overlayState = OverlayControlesDisplayState.PAUSE
    }
    if(this.state.ended){
      overlayState = OverlayControlesDisplayState.REPLAY;
    }
    return (
      <div onMouseMove={()=>this.mouseMove()}>
        <Player 
          style={this.styles.player}
          ref={(player) => this.player = player } 
          onPositionChanged={(pos: number)=>this.setState({position: pos })}
          onBuffering={(perc: number)=>this.setState({buffer: perc})}
          onPlaying={()=>this.setState({playing:true})}
          onPaused={()=>this.setState({playing:false})}
          onStopped={()=>this.setState({playing:false})}
          onEndReached={()=>this.onEndReached()}
          />
        <Toolbox style={this.styles.toolbox} 
          shown={this.state.uiShownToolBox}
          >
            <Header />
            <OverlayControles
              onClick={()=>this.tooglePlayPause()}
              displayState={overlayState}
              />
          </Toolbox>
          <Controles shown={this.state.uiShownControle}> 
              <ProgressBar 
                position={this.state.position} 
                buffer={this.state.buffer}
                onSeek={(position)=>this.seeking(position)}
                />
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