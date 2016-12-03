/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import * as React from 'react';
import {Component} from 'react';

import * as colors from 'material-ui/styles/colors';


import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from './App';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: colors.deepOrange500,
  },
  appBar:{
    color: colors.transparent,
    textColor:colors.grey500
  },
  icon:{
    backgroundColor: colors.grey500,
    color:colors.grey900
  },
  svgIcon:{
    color: colors.grey500,
  },
  slider:{
    selectionColor: colors.grey500,
    trackColorSelected: colors.grey800,
    handleColorZero: colors.grey900,
    handleFillColor: colors.grey900,
    rippleColor: colors.red900,
    handleSizeActive:15
  }
});

export default class Main extends Component<any, any> {

  constructor(props, context) {
    super(props, context);
  }

  handleToggle = () => this.setState({open: !this.state.open});
  handleClose = () =>  this.setState({open: false});

  render() {

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <App />
      </MuiThemeProvider>
    );
  }
}