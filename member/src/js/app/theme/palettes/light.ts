import createPalette from '@material-ui/core/styles/createPalette';

export const createLightPalette = () => {
  const palette = createPalette({
    type: 'light',
    primary: {
      main: '#3c3e42',
    },
    secondary: {
      main: '#1a77ad',
    },
    action: {
      default: 'rgba(0, 0, 0, 0.02)',
    },
  });

  return palette;
};
