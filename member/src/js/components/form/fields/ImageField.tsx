import React from 'react';
import { IconButton, Avatar, Typography } from '@material-ui/core';
import { Icon } from 'Components/index';
import { useField } from '../UseField';
import { FieldError, FieldProps } from '../types';
import { getBackendUrl } from 'Apollo/Utils';

const styles: any = {};

interface AvatarEmptyProps {
  error?: FieldError;
}

const AvatarEmpty: React.FC<AvatarEmptyProps> = ({ error }) => {
  const cls = error ? 'avatar-empty-error' : 'avatar-empty';
  return (
    <Avatar className={styles[cls]}>
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

interface DisplayProps {
  url: string;
  cdn: string;
  error?: FieldError;
}

const Display: React.FC<DisplayProps> = ({ url, cdn, error }) => {
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
    <div className={className}>
      <div className={styles.imagefield}>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id={id}
          type="file"
          onChange={onChange}
        />
        <label htmlFor={id}>
          <IconButton className={styles.button} component="span">
            <Display url={src} cdn={field.value as string} error={field.error} />
          </IconButton>
        </label>
        <Label label={label} error={field.error} />
      </div>
    </div>
  );
};
