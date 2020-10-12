import React from 'react';
import { IconButton, Avatar, Typography, makeStyles } from '@material-ui/core';
import { Box, Icon } from 'Components/index';
import { useField } from '../UseField';
import { FieldError, FieldProps } from '../types';
import { getBackendUrl } from 'Apollo/Utils';
import clx from 'classnames';

interface AvatarEmptyProps {
  error?: FieldError;
}

const useAvatarStyles = makeStyles((theme) => ({
  avatar: {
    width: '100px',
    height: '100px',
    backgroundColor: '#bdbdbd',
    cursor: 'pointer',
    transition: 'all 0.5s ease',
  },
  error: {
    border: `1px solid ${theme.palette.error.main}`,
  },
  icon: {
    position: 'absolute',
    color: 'white',
    zIndex: 10,
    transform: 'scale3d(1.5, 1.5, 1.5)',
    transition: 'all 0.5s ease',
  },
}));

const AvatarEmpty: React.FC<AvatarEmptyProps> = ({ error }) => {
  const styles = useAvatarStyles();

  return (
    <Avatar className={clx(styles.avatar, { [styles.error]: Boolean(error) })}>
      <Icon className={styles.icon} type="upload" />
    </Avatar>
  );
};

interface LabelProps {
  error?: FieldError;
  label: string;
}

const Label: React.FC<LabelProps> = ({ error, label }) => {
  return (
    <div>
      <Typography variant="subtitle1">
        {label}
      </Typography>
      {error ? (
        <Box color="error.main">
          <Typography variant="subtitle2">{error.message}</Typography>
        </Box>
      ) : null}
    </div>
  );
};

interface DisplayProps {
  url: string;
  cdn: string;
  error?: FieldError;
}

const Display: React.FC<DisplayProps> = ({ url, cdn, error }) => {
  const styles = useAvatarStyles();
  if (url) {
    return <Avatar src={url} className={styles.avatar} />;
  } else if (cdn) {
    return <Avatar src={getBackendUrl() + cdn} className={styles.avatar} />;
  } else {
    return <AvatarEmpty error={error} />;
  }
};

interface ImageFieldClasses {}

interface ImageFieldProps extends FieldProps {
  className?: string;
  classes?: ImageFieldClasses;
}

export const ImageField: React.FC<ImageFieldProps> = ({
  id,
  label,
  className,
  classes,
  ...rest
}) => {
  const [src, setSrc] = React.useState(null);
  const fieldProps = { id, fieldType: 'image', ...rest };
  const field = useField(fieldProps);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setSrc(e.target.result);
    };
    reader.readAsDataURL(file);
    field.onChange(file);
  };

  return (
    <Box.Row className={className}>
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id={id}
        type="file"
        onChange={onChange}
      />
      <label htmlFor={id}>
        <Box clone p={0} mr={2}>
          <IconButton component="span">
            <Display
              url={src}
              cdn={field.value as string}
              error={field.error}
            />
          </IconButton>
        </Box>
      </label>
      <Label label={label} error={field.error} />
    </Box.Row>
  );
};
