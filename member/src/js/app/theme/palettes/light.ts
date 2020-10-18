import createPalette from '@material-ui/core/styles/createPalette';

export const createLightPalette = () => {
  const palette = createPalette({
    type: 'light',
    primary: {
      main: '#1a77ad',
    },
    secondary: {
      main: '#1a77ad',
    },
    action: {
      default: 'rgba(0, 0, 0, 0.02)',
    },
    background: {
      default: '#f2f3f5'
    },
    navigation: {
      main: '#fff',
    },
  });

  palette.navigation = palette.augmentColor(palette.navigation);
  return palette;
};
