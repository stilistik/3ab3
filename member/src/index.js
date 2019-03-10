import React from 'react';
import ReactDOM from 'react-dom';
import App from 'App/App';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import './css/master.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3c3e42',
    },
    secondary: {
      main: '#2979ff',
    },
  },
  typography: {
    fontFamily: '"MessinaBold", sans-serif',
    useNextVariants: true,
  },
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById('root')
);
