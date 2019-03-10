import React from 'react';
import ReactDOM from 'react-dom';
import App from 'Components/app';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import './css/master.css';

global.API_URL = 'http://localhost:4000';

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
    color: '#222',
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
