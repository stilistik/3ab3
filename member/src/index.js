import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import App from 'Components/app';
import Store from 'Redux/Store';

import './css/master.css';

global.API_URL = 'http://localhost:4000';

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

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Store>
      <App />
    </Store>
  </MuiThemeProvider>,
  document.getElementById('root')
);
