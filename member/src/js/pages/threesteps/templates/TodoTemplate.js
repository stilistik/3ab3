import React from 'react';
import { Chip, Avatar } from '@material-ui/core';

import styles from './TodoTemplate.less';

class TodoTemplate extends React.Component {
  render() {
    const { offsetDays, text, id } = this.props.template;
    const { isSelected, onClick } = this.props;
    return (
      <div style={{ margin: '5px' }}>
        <Chip
          className={isSelected ? styles.selected : ''}
          classes={{ root: styles.chip, label: styles.chiplabel }}
          avatar={<Avatar className={styles.chipAvatar}>{offsetDays}</Avatar>}
          label={text}
          onClick={onClick ? () => onClick(id) : null}
        />
      </div>
    );
  }
}

export default TodoTemplate;
