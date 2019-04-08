import React from 'react';
import { Fab, Divider } from '@material-ui/core';
import { Icon } from 'Components';
import styles from './CreateButton.css';

export class CreateButton extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.buffer}>
          <Divider />
        </div>
        <Fab color="primary" onClick={this.props.onClick}>
          <Icon type="add" />
        </Fab>
        <div className={styles.buffer}>
          <Divider />
        </div>
      </div>
    );
  }
}
