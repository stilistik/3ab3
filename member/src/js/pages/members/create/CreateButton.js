import React from 'react';
import { Fab, Typography } from '@material-ui/core';
import { Icon } from 'Components';

import styles from './CreateButton.css';

class CreateButton extends React.Component {
  render() {
    return (
      <div className={styles.item}>
        <Fab
          color="primary"
          className={styles.button}
          onClick={this.props.onClick}
        >
          <Icon type="add" />
        </Fab>
        <Typography>Create Member</Typography>
      </div>
    );
  }
}

export default CreateButton;
