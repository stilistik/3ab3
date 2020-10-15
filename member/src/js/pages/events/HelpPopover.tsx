import React from 'react';
import { IconButton, makeStyles, Popover, Typography } from '@material-ui/core';
import { Icon } from 'Components/index';

const useStyles = makeStyles((theme) => ({
  typo: {
    padding: theme.spacing(2),
    maxWidth: '360px',
  },
}));

export const HelpPopover: React.FC = ({ children }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const styles = useStyles();

  const handleClick = (e: React.MouseEvent) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  return (
    <React.Fragment>
      <IconButton onClick={handleClick}>
        <Icon type="help" />
      </IconButton>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography className={styles.typo}>{children}</Typography>
      </Popover>
    </React.Fragment>
  );
};
