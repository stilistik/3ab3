import React from 'react';
import clx from 'classnames';
import { SearchSelectInput, SearchSelectInputProps } from '../../inputs';
import { AutocompleteClassKey } from '@material-ui/lab';
import { FieldProps } from '../types';
import { SelectOption } from 'Components/inputs';
import { useField } from '../UseField';
import { FormControl } from '../FormControl';

export type SearchSelectFieldProps = Omit<FieldProps, 'fieldType'> &
  Omit<SearchSelectInputProps, 'options'> & {
    className?: string;
    classes?: SearchSelectFieldClasses;
    onPersistentSelected?: (option: SelectOption) => void;
    options?: SelectOption[];
  };

type AutoCompleteClasses = Partial<Record<AutocompleteClassKey, string>>;

export interface SearchSelectFieldClasses {
  error?: string;
  autocomplete?: AutoCompleteClasses;
}

/**
 * This is a helper to merge the error class with the autocomplete input root if the field is
 * not valid. This is required because the AutoComplete component does not support an error class
 * by itself.
 * @param classes The classes prop of the SearchSelectField
 * @param hasError Boolean indicating if the field has an error
 */
export function getInputClasses(classes: SearchSelectFieldClasses = {}, hasError: boolean): AutoCompleteClasses {
  const { root, ...restInputClasses } = classes.autocomplete || {};
  return {
    root: clx(root, { [classes?.error]: hasError }),
    ...restInputClasses,
  };
}

export const SearchSelectField: React.FC<SearchSelectFieldProps> = ({
  id,
  className,
  classes,
  onPersistentSelected,
  options,
  defaultValue = null,
  ...rest
}) => {
  const fieldProps = { id, fieldType: 'select', defaultValue, ...rest };
  const field = useField(fieldProps);

  function handlePersistentOption(option: SelectOption) {
    // a persistent option was selected
    // if the field was given a handler for persistent options, call it with the option
    if (onPersistentSelected) onPersistentSelected(option);

    // if the option has itself a select handler, call it
    if (option.onSelect) option.onSelect();
  }

  function handleChange(e: React.ChangeEvent<any>, selectedOption: SelectOption) {
    if (selectedOption && selectedOption.persistent) handlePersistentOption(selectedOption);
    else {
      // store the selected option's value in the form state
      field.onChange(selectedOption.value);
      field.onFieldCommit(id, selectedOption.value);
      field.onFieldOptionSelected(id, selectedOption);
    }
  }

  const cls = clx(className, { [classes?.error]: Boolean(field.error) });
  const inputValue = options.find((option) => option.value === field.value) || null;

  return (
    <FormControl className={cls} error={field.error} required={rest.required}>
      <SearchSelectInput
        value={inputValue}
        options={options}
        onChange={handleChange}
        classes={getInputClasses(classes, Boolean(field.error))}
        {...rest}
      />
    </FormControl>
  );
};
