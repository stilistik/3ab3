import '@material-ui/core/styles';

declare module '@material-ui/core/styles/createPalette' {
  interface TypeAction {
    default: React.CSSProperties['color'];
  }

  interface PaletteOptions {
    action?: Partial<TypeAction>;
  }

  interface Palette {
  }
}
