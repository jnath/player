
import * as React from "react";
import { Component } from "react";

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import { TouchTapEvent } from 'material-ui';

interface State {
    open: boolean
}

export default class Header extends Component<any, State> {

    style: any = {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%'
    }

    constructor(props:any) {
        super(props);
        this.state = {open: false};
    }

    handleToggle = () => this.setState({open: !this.state.open});
    handleClose = (event: TouchTapEvent) =>  {
      this.setState({open: false})
    };

    render() {
        return (
            <header style={this.style} {...this.props}>
                <AppBar 
                  onLeftIconButtonTouchTap={this.handleToggle}
                  />
                <Drawer
                    docked={false}
                    width={200}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}
                    >
                    <MenuItem onTouchTap={this.handleClose}>Menu Item</MenuItem>
                    <MenuItem onTouchTap={this.handleClose}>Menu Item 2</MenuItem>
                </Drawer>
            </header>
        )
    }
}