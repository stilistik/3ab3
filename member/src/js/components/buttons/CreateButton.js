import React from 'react';
import { Fab, Divider } from '@material-ui/core';
import { Icon } from 'Components';
import styles from './CreateButton.css';

class CreateButton extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.left}>
          <Divider />
        </div>
        <Fab color="primary" onClick={this.props.onClick}>
          <Icon type="add" />
        </Fab>
        <div className={styles.right}>
          <Divider />
        </div>
      </div>
    );
  }
}

export default CreateButton;
