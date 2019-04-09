import React from 'react';
import { IconButton, Avatar, Typography } from '@material-ui/core';
import { Icon } from 'Components';

import styles from './ImageField.css';

const AvatarEmpty = ({ error }) => {
  const cls = error ? 'avatar-empty-error' : 'avatar-empty';
  return (
    <Avatar className={styles[cls]}>
      <Icon className={styles.icon} type="upload" />
    </Avatar>
  );
};

const Label = ({ error, name }) => {
  return (
    <div>
      <Typography variant="subtitle1" className={styles.typo}>
        {name}
      </Typography>
      {error ? (
        <Typography variant="subtitle2" className={styles.error}>
          {error.message}
        </Typography>
      ) : null}
    </div>
  );
};

const Display = ({ url, cdn, err }) => {
  if (url) {
    return <Avatar src={url} className={styles.avatar} />;
  } else if (cdn) {
    return <Avatar src={global.API_URL + cdn} className={styles.avatar} />;
  } else {
    return <AvatarEmpty error={err} />;
  }
};

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
    const { id, error, name, className, value, style } = this.props;
    return (
      <div className={className} style={style}>
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
              <Display url={this.state.src} cdn={value} />
            </IconButton>
          </label>
          <Label name={name} error={error} />
        </div>
      </div>
    );
  }
}
