import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { StylesProvider } from '@material-ui/core/styles';

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
    fontFamily: '"MontSerrat", sans-serif',
    fontWeight: 900,
    useNextVariants: true,
  },
});

class Style extends React.Component {
  render() {
    return (
      <StylesProvider injectFirst>
        <MuiThemeProvider theme={theme}>{this.props.children}</MuiThemeProvider>
      </StylesProvider>
    );
  }
}

export default Style;
