import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3c3e42',
    },
    secondary: {
      main: '#1a77ad',
    },
  },
  typography: {
    color: '#222',
    fontFamily: '"MessinaBold", sans-serif',
    useNextVariants: true,
  },
});

const generateClassName = createGenerateClassName();
const jss = create({
  ...jssPreset(),
  insertionPoint: 'insertion-point-jss',
});

class Style extends React.Component {
  render() {
    return (
      <JssProvider jss={jss} generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme}>{this.props.children}</MuiThemeProvider>
      </JssProvider>
    );
  }
}

export default Style;
