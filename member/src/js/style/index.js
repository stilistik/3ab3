import React from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { create } from 'jss';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';

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

const jss = create({
  ...jssPreset(),
});

class Style extends React.Component {
  render() {
    return (
      <StylesProvider jss={jss} injectFirst>
        <ThemeProvider theme={theme}>{this.props.children}</ThemeProvider>
      </StylesProvider>
    );
  }
}

export default Style;
