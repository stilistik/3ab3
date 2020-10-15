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
    fontFamily: '"MontSerrat", sans-serif',
  },
});

export const Theme: React.FC = ({ children }) => {
  return (
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </StylesProvider>
  );
};
