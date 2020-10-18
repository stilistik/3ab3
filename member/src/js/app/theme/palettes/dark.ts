import createPalette from '@material-ui/core/styles/createPalette';

export const createDarkPalette = () => {
  const palette = createPalette({
    type: 'dark',
    primary: {
      main: '#1a77ad',
    },
    secondary: {
      main: '#1a77ad',
    },
    action: {
      default: 'rgba(255, 255, 255, 0.04)',
      hover: 'rgba(255, 255, 255, 0.08)',
    },
    navigation: {
      main: '#3c3e42',
    },
  });
  
  palette.navigation = palette.augmentColor(palette.navigation);
  return palette;
};
