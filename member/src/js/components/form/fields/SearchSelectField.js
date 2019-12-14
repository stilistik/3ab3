import React from 'react';
import { SearchSelectInput } from '../../inputs';
import { Field } from './Field';

const defaultOptionGenerator = (item) => {
  if (item)
    return { label: item.name, value: item.uuid || item.id, item: item };
  else return null;
};

const defaultOptionResolver = (option) => {
  if (option) return option.item;
  else return null;
};

const FieldInput = ({
  items,
  persistentOptions,
  optionResolver,
  optionGenerator,
  onChange,
  onFieldCommit,
  value,
  ...rest
}) => {
  const handleChange = (val) => {
    if (val && val.type === 'PERSISTENT') {
      val.onSelect();
    } else {
      const value = optionResolver(val);
      onChange(value);
      onFieldCommit(rest.id, value);
    }
  };

  const options = items.map((item) => optionGenerator(item));
  const renderValue = optionGenerator(value);

  return (
    <SearchSelectInput
      onChange={handleChange}
      options={options}
      persistentOptions={persistentOptions}
      value={renderValue}
      {...rest}
    />
  );
};

export const SearchSelectField = (props) => {
  return (
    <Field fieldType="select" defaultValue="" {...props}>
      <FieldInput />
    </Field>
  );
};

SearchSelectField.defaultProps = {
  optionGenerator: defaultOptionGenerator,
  optionResolver: defaultOptionResolver,
};
