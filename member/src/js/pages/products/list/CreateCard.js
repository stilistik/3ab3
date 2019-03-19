import React from 'react';
import { CardActionArea } from '@material-ui/core';
import { Icon } from 'Components';

import styles from './CreateCard.css';

class CreateCard extends React.Component {
  render() {
    return (
      <div className={styles.card}>
        <CardActionArea className={styles.area} onClick={this.props.onClick}>
          <Icon type="add" className={styles.icon} />
        </CardActionArea>
      </div>
    );
  }
}

export default CreateCard;
