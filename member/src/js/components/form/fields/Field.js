import React from 'react';
import { useFormContext } from '../Form';
import { FormControl, FormHelperText } from '@material-ui/core';
import classnames from 'classnames';

import styles from './Field.less';

export const Field = (props) => {
  const { children, style, className, ...rest } = props;

  // context methods to set field value in form and register/unregister
  const formContext = useFormContext();
  if (!Object.keys(formContext).length)
    throw new Error('Form Error: Field component used outside Form');

  const {
    setFieldValue,
    setFieldOptions,
    registerField,
    unregisterField,
    requestSubmit,
    onFieldCommit,
    noHelp,
  } = formContext;

  // called from form to update local state
  const [value, setValue] = React.useState(rest.defaultValue);
  const [opts, setOpts] = React.useState(rest.defaultOpts);
  const [error, setError] = React.useState(null);

  // called on mount and unmount to register and unregister field with form
  React.useEffect(() => {
    registerField(rest.id, { ...rest, setValue, setOpts, setError });
    return () => unregisterField(rest.id);
  }, []);

  // updates field value in form
  const onChange = (value) => {
    setFieldValue(rest.id, value);
  };

  // updates field options in form
  const onChangeOpts = (opts) => {
    setFieldOptions(rest.id, opts);
  };

  const cls = classnames(styles.field, className);
  return (
    <FormControl error={error && true} className={cls} style={style}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          ...rest,
          error,
          value,
          opts,
          onChange,
          onChangeOpts,
          onFieldCommit,
          requestSubmit,
        })
      )}
      {!noHelp && (
        <FormHelperText>{error ? error.message : null}</FormHelperText>
      )}
    </FormControl>
  );
};

Field.defaultProps = {
  defaultOpts: { skip: false },
};
