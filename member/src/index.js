import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';

import App from 'Components/app';
import Store from 'Redux/Store';
import client from 'Apollo';

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

const generateClassName = createGenerateClassName();
const jss = create({
  ...jssPreset(),
  insertionPoint: 'insertion-point-jss',
});

ReactDOM.render(
  <JssProvider jss={jss} generateClassName={generateClassName}>
    <MuiThemeProvider theme={theme}>
      <Store>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </Store>
    </MuiThemeProvider>
  </JssProvider>,
  document.getElementById('root')
);
