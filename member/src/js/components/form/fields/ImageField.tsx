import React from 'react';
import { Avatar, Typography, makeStyles, Button } from '@material-ui/core';
import { Box, Icon } from 'Components/index';
import { useField } from '../UseField';
import { FieldError } from '../types';
import { getBackendUrl } from 'App/network/Utils';
import clx from 'classnames';
import { useTranslation } from 'react-i18next';

interface AvatarEmptyProps {
  error?: FieldError;
}

const useAvatarStyles = makeStyles((theme) => ({
  avatar: {
    width: '100px',
    height: '100px',
    backgroundColor: '#bdbdbd',
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
      <Typography variant="body2">{label}</Typography>
      {error ? (
        <Box color="error.main">
          <Typography variant="body2">{error.message}</Typography>
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

interface ImageFieldProps {
  id: string;
  label: string;
  required?: boolean;
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
  const { t } = useTranslation();
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
      <Display url={src} cdn={field.value as string} error={field.error} />
      <Box ml={2}>
        <Label label={label} error={field.error} />
        <label htmlFor={id}>
          <Button component="span">{t('Upload')}</Button>
        </label>
      </Box>
    </Box.Row>
  );
};
