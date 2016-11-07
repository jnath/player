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
}

interface PlayerProps extends React.HTMLProps<HTMLCanvasElement>{
    play:boolean,
    url:string
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
        this.state = {};

    }

    componentDidMount() {
        renderer.bind(document.getElementById("playerCanvas"), vlc, options);
    }

    render() {
        if(this.props.url && this.props.play){
            vlc.play(this.props.url);
        }
        return (
            <canvas id="playerCanvas" style={this.style} />
        )
    }
}