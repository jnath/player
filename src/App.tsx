
import * as React from 'react';
import {Component} from 'react';

import Player from './components/Player';
import Toolbox from './components/Toolbox';

import Header from './components/Header';
import OverlayControles, { DisplayState } from './components/OverlayControles';
import PlayCircleFilled from 'material-ui/svg-icons/av/play-circle-filled';


interface MainState{
  uiShown?:boolean;
  played?:boolean;
  currentUrl?: string;
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

  constructor(props) {
    super(props);

    this.state = {
      uiShown: false,
      played: false,
      currentUrl: 'file:///Users/jnath2/Movies/trailer_1080p.mov'
    };
    this.hoverTimeout = null;
  }

  hover(){
    if(this.hoverTimeout){
      clearTimeout(this.hoverTimeout);
    }
    this.state.uiShown || this.setState({uiShown: true});
    this.hoverTimeout = setTimeout(() => {
      this.setState({uiShown: false})
    }, 5000)
  }

  tooglePlayPause(){
    this.setState({played:!this.state.played})
  }

  render() {
    return (
      <div onMouseMove={()=>this.hover()}>
        <Player style={this.styles.player}
          play={this.state.played} 
          url={this.state.currentUrl}
          />
        <Toolbox style={this.styles.toolbox} 
          shown={this.state.uiShown}
          >
            <Header />
            <OverlayControles
              onClick={()=>this.tooglePlayPause()}
              displayState={this.state.played ? DisplayState.PAUSE : DisplayState.PLAY}
              />
          </Toolbox>
      </div>
    );
  }
}