import React from 'react';
import {
  IconButton,
  Button,
  Popper,
  Fade,
  Paper,
  Typography,
  ClickAwayListener,
} from '@material-ui/core';
import { Icon } from 'Components';

import styles from './DeleteButton.css';

class DeleteButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };
  }

  onClick = (e) => {
    this.setState({ anchorEl: e.target });
  };

  onCancel = () => {
    this.setState({ anchorEl: null });
  };

  onDelete = () => {
    this.props.onDelete();
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const open = anchorEl ? true : false;
    return (
      <div>
        <IconButton size="small" color="primary" onClick={this.onClick}>
          <Icon type="delete" />
        </IconButton>
        <Popper open={open} anchorEl={anchorEl} transition>
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper className={styles.paper}>
                <ClickAwayListener onClickAway={this.onCancel}>
                  <div className={styles.popper}>
                    <Typography className={styles.typo}>
                      Do you really want to delete this item?
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={this.onDelete}
                      className={styles['button-delete']}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="contained"
                      onClick={this.onCancel}
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
      </div>
    );
  }
}

export default DeleteButton;
