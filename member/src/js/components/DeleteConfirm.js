import React from 'react';
import {
  Button,
  Popper,
  Fade,
  Paper,
  Typography,
  ClickAwayListener,
} from '@material-ui/core';

import styles from './DeleteConfirm.css';

export class DeleteConfirm extends React.Component {
  render() {
    const { anchorEl, onCancel, onDelete } = this.props;
    return (
      <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper className={styles.paper}>
              <ClickAwayListener onClickAway={onCancel}>
                <div className={styles.popper}>
                  <Typography className={styles.typo}>
                    Do you really want to delete this?
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={onDelete}
                    className={styles['button-delete']}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    onClick={onCancel}
                    className={styles['button-cancel']}
                  >
                    Cancel
                  </Button>
                </div>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    );
  }
}
