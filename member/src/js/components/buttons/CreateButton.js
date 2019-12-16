import React from 'react';
import { Fab, Divider } from '@material-ui/core';
import { Icon } from 'Components';
import styles from './CreateButton.css';

const CreateButton = ({ disableLine, onClick }) => {
  return (
    <div className={styles.container}>
      {!disableLine && (
        <div className={styles.left}>
          <Divider />
        </div>
      )}
      <Fab color="primary" onClick={onClick}>
        <Icon type="add" />
      </Fab>
      {!disableLine && (
        <div className={styles.right}>
          <Divider />
        </div>
      )}
    </div>
  );
};

export default CreateButton;
