import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { StylesProvider } from '@material-ui/core/styles';
import { CssBaseline, useMediaQuery } from '@material-ui/core';
import { createLightPalette } from './palettes/light';
import { createDarkPalette } from './palettes/dark';

const ThemeContext = React.createContext(undefined);

const useDarkMode = () => {
  const localStorageValue = window.localStorage.getItem('dark') === 'true';
  const osPreference = useMediaQuery('(prefers-color-scheme: dark');
  const state = React.useState(localStorageValue || osPreference);
  return state;
};

export const useThemeContext = () => {
  const contextValue = React.useContext(ThemeContext);
  if (contextValue === undefined)
    throw new Error(
      'useThemeContext must be used within a ThemeContext Provider'
    );
  return contextValue;
};

export const Theme: React.FC = ({ children }) => {
  const [dark, setDark] = useDarkMode();

  const theme = React.useMemo(() => {
    const palette = dark ? createDarkPalette() : createLightPalette();
    return createMuiTheme({
      palette: palette,
      typography: {
        fontFamily: '"MontSerrat", sans-serif',
      },
    });
  }, [dark]);
  return (
    <ThemeContext.Provider value={{ dark, setDark }}>
      <StylesProvider injectFirst>
        <CssBaseline />
        <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
      </StylesProvider>
    </ThemeContext.Provider>
  );
};
