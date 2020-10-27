import React from 'react';
import clx from 'classnames';
import { MultiSelectInput, MultiSelectInputProps } from '../../inputs';
import {
  AutocompleteClassKey,
  AutocompleteGetTagProps,
} from '@material-ui/lab';
import { FieldProps } from '../types';
import { SelectOption } from 'Components/inputs';
import { useField } from '../UseField';
import { FormControl } from '../FormControl';
import { FieldInputLabel } from '../FieldInputLabel';

// typeguard for ISelectOption
function isSelectOption(value: any): value is SelectOption {
  return (value as SelectOption).value !== undefined;
}

export type MultiSelectFieldProps = Omit<FieldProps, 'fieldType'> &
  Omit<MultiSelectInputProps, 'renderTags' | 'options'> & {
    className?: string;
    classes?: MultiSelectFieldClasses;
    renderTags?: (
      value: SelectOption[],
      getTagProps: AutocompleteGetTagProps,
      handleRemoveFromValue: (toRemove: SelectOption) => void
    ) => React.ReactNode;
    options?: SelectOption[];
  };

type AutoCompleteClasses = Partial<Record<AutocompleteClassKey, string>>;

export interface MultiSelectFieldClasses {
  error?: string;
  autocomplete?: AutoCompleteClasses;
}

/**
 * This is a helper to merge the error class with the autocomplete input root if the field is
 * not valid. This is required because the AutoComplete component does not support an error class
 * by itself.
 * @param classes The classes prop of the MultiSelectField
 * @param hasError Boolean indicating if the field has an error
 */
function getInputClasses(
  classes: MultiSelectFieldClasses = {},
  hasError: boolean
): AutoCompleteClasses {
  const { root, ...restInputClasses } = classes.autocomplete || {};
  return {
    root: clx(root, { [classes?.error]: hasError }),
    ...restInputClasses,
  };
}

export const MultiSelectField: React.FC<MultiSelectFieldProps> = ({
  id,
  label,
  className,
  classes,
  renderTags,
  options,
  defaultValue = [],
  ...rest
}) => {
  const fieldProps = { id, fieldType: 'multiselect', defaultValue, ...rest };
  const field = useField(fieldProps);

  function handleChange(
    e: React.ChangeEvent<any>,
    selectedOptions: (string | SelectOption)[]
  ) {
    const values = selectedOptions.map((option) => {
      if (isSelectOption(option)) return option.value;
      else return option;
    });

    // store the selected option in the form state
    field.onChange(values);
    field.onFieldCommit(id, values);
    field.onFieldOptionSelected(id, selectedOptions as SelectOption[]);
  }

  /**
   * Injects a delete handler into the renderTags props
   */
  function handleRenderTags(
    value: SelectOption[],
    getTagProps: AutocompleteGetTagProps
  ) {
    // deletes an item from the value
    function handleRemoveFromValue(toRemove: SelectOption) {
      const newValue = (field.value as string[]).filter(
        (el) => el !== toRemove.value
      );
      const newOptions = options.filter((option) =>
        newValue.includes(option.value)
      );
      field.onChange(newValue);
      field.onFieldCommit(id, newValue);
      field.onFieldOptionSelected(id, newOptions);
    }
    return renderTags(value, getTagProps, handleRemoveFromValue);
  }

  const cls = clx(className, { [classes?.error]: Boolean(field.error) });

  const inputValue = options.filter((option) =>
    (field.value as string[]).includes(option.value)
  );

  return (
    <FormControl className={cls} error={field.error}>
      <MultiSelectInput
        value={inputValue}
        options={options}
        onChange={handleChange}
        classes={getInputClasses(classes, Boolean(field.error))}
        renderTags={renderTags ? handleRenderTags : undefined}
        label={<FieldInputLabel required={rest.required} label={label} />}
        {...rest}
      />
    </FormControl>
  );
};
