import React from 'react';
import { IconButton, Avatar, Typography } from '@material-ui/core';
import { Icon } from 'Components';

import styles from './ImageField.css';

export class ImageField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      src: null,
    };
  }

  onChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = this.onLoad;
    reader.readAsDataURL(file);
    this.props.onChange(this.props.id, file);
  };

  onLoad = (e) => {
    this.setState({ src: e.target.result });
  };

  render() {
    const { id, name, className } = this.props;
    return (
      <div className={className}>
        <div className={styles.imagefield}>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id={id}
            type="file"
            onChange={this.onChange}
          />
          <label htmlFor={id}>
            <IconButton
              className={styles.button}
              variant="contained"
              component="span"
            >
              {this.state.src ? (
                <Avatar src={this.state.src} className={styles.avatar} />
              ) : (
                <Avatar className={styles['avatar-empty']}>
                  <Icon className={styles.icon} type="upload" />
                </Avatar>
              )}
            </IconButton>
          </label>
          <Typography variant="subtitle1" className={styles.typo}>
            {name}
          </Typography>
        </div>
      </div>
    );
  }
}
