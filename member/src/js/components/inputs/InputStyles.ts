import { makeStyles } from '@material-ui/core/styles';

export const useSelectStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    overflow: 'visible',
    width: '100%',
  },
  input: {
    width: '100%',
    maxWidth: '100%',
    height: 'auto',
    display: 'flex',
    flexWrap: 'wrap',
    '& input': {
      flexBasis: '25px',
      flexGrow: 1,
    },
  },
  paper: {
    width: '100%',
    position: 'absolute',
    zIndex: 10,
    background: theme.palette.background.paper,
  },
  menuItem: {
    '& > :not(:last-child)': {
      marginRight: '5px',
    },
  },
  chip: {
    marginRight: '5px',
    marginBottom: '5px',
  },
  chipLabel: {
    display: 'flex',
    alignItems: 'center',
    '& span': {
      display: 'flex',
      alignItems: 'center',
    },
    '& > :not(:last-child)': {
      marginRight: '5px',
    },
  },
}));
