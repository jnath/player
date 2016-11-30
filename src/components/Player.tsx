        // vlc.play("http://archive.org/download/CartoonClassics/Krazy_Kat_-_Keeping_Up_With_Krazy.mp4");
        // vlc.play("file:///Users/jnath2/Movies/Krazy_Kat_-_Keeping_Up_With_Krazy.mp4");
        // vlc.play("file:///Users/jnath2/Movies/allencode/allencode.mov");
        // vlc.play("http://download.blender.org/peach/bigbuckbunny_movies/big_buck_bunny_1080p_h264.mov");

import * as React from "react";
import { Component } from "react";

import { TouchTapEvent } from 'material-ui';

const renderer = require("wcjs-renderer");
const vlc = require("wcjs-prebuilt").createPlayer();
const options = { /* Add renderer options here */ }


interface PlayerState {
    pause: boolean;
}

interface PlayerProps extends React.HTMLProps<HTMLCanvasElement>{
    // play:boolean;
    // url:string;
    onPositionChanged?: (pos: number) => void;
    onBuffering?: (pos: number) => void;
    onPlaying?: () => void;
    onPaused?: () => void;
    onStopped?: () => void;
    onEndReached?: () => void;

}


export default class Player extends Component<PlayerProps, PlayerState> {
    
    style: any = {
      position: 'absolute',
      width:'100%',
      height:'auto',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)'
    }

    constructor(props:PlayerProps) {
        super(props);
        this.state = {
            pause:false
        };
    }
     
    
    componentDidMount() {
        renderer.bind(document.getElementById("playerCanvas"), vlc, options);
        console.log(vlc);
        vlc.onPositionChanged = this.props.onPositionChanged;
        vlc.onBuffering = this.props.onBuffering;
        vlc.onPlaying = () => {
            this.setState({pause: false});
            this.props.onPlaying();
        }
        vlc.onPaused = () => {
            this.setState({pause: true});
            this.props.onPaused();
        }
        vlc.onStopped = () => {
            this.setState({pause: false});
            this.props.onStopped();
        }
        vlc.onEndReached = ()=>{
            this.props.onPositionChanged(1);
            this.props.onEndReached()
        }
    }

    tooglePlayPause(url:string){
        if(!vlc.playing && !this.state.pause){
            vlc.play(url);
        }else{
            vlc.togglePause();
        }
    }

    get mute(){ return vlc.mute; }
    set mute(value:boolean){
        vlc.mute = value;
    }

    get volume(){ return vlc.volume; }
    set volume(value: number){
        vlc.volume = value;
    }

    get position(){ return vlc.volume; }
    set position(value: number){
        vlc.position = value;
    }

    render() {
        return (
            <canvas id="playerCanvas" style={this.style} />
        )
    }
}