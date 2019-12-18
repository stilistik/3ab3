import React from 'react';
import { Field } from './Field';
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

const Label = ({ error, label }) => {
  return (
    <div>
      <Typography variant="subtitle1" className={styles.typo}>
        {label}
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

const ImageInput = ({ id, error, label, value, ...rest }) => {
  const [src, setSrc] = React.useState(null);

  const onChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = onLoad;
    reader.readAsDataURL(file);
    rest.onChange(file);
  };

  const onLoad = (e) => {
    setSrc(e.target.result);
  };

  return (
    <div className={rest.className} style={rest.style}>
      <div className={styles.imagefield}>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id={id}
          type="file"
          onChange={onChange}
        />
        <label htmlFor={id}>
          <IconButton
            className={styles.button}
            variant="contained"
            component="span"
          >
            <Display url={src} cdn={value} error={error} />
          </IconButton>
        </label>
        <Label label={label} error={error} />
      </div>
    </div>
  );
};

export const ImageField = (props) => {
  return (
    <Field fieldType="image" defaultValue={null} {...props}>
      <ImageInput />
    </Field>
  );
};
