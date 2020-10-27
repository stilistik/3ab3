import React from 'react';
import TextField from '@material-ui/core/TextField';
import {
  Autocomplete,
  AutocompleteProps,
  AutocompleteRenderInputParams,
  createFilterOptions,
  FilterOptionsState,
} from '@material-ui/lab';
import { SelectOption } from './types';

// we use the more complicated freeSolo type for the search form
type MultiSelectAutocompleteProps = AutocompleteProps<
  SelectOption,
  true,
  true,
  true
>;

export type MultiSelectInputProps = Omit<
  MultiSelectAutocompleteProps,
  'renderInput'
> & {
  id?: string;
  label?: React.ReactNode;
  disableUnderline?: boolean;
  placeholder?: string;
  renderInput?: (
    params: AutocompleteRenderInputParams,
    value: (string | SelectOption)[]
  ) => React.ReactNode;
};

export const MultiSelectInput: React.FC<MultiSelectInputProps> = ({
  id,
  label,
  value,
  renderInput,
  placeholder,
  disableUnderline,
  ...rest
}) => {
  /**
   * Implements a default renderInput behavior
   */
  function handleRenderInput(params: AutocompleteRenderInputParams) {
    if (renderInput) return renderInput(params, value);
    else {
      const { InputProps, inputProps, ...rest } = params;
      return (
        <TextField
          label={label}
          placeholder={!value || !value.length ? placeholder : ''}
          InputProps={{
            ...InputProps,
            disableUnderline: disableUnderline,
          }}
          inputProps={{
            ...inputProps,
            style: { paddingTop: 6, paddingBottom: 6 },
          }}
          {...rest}
        />
      );
    }
  }

  /**
   * Enhances the default option filtering algorithm of Autocomplete. Makes persistent
   * options always render at the top of the list
   */
  function filterOptions(
    options: SelectOption[],
    state: FilterOptionsState<SelectOption>
  ): SelectOption[] {
    const defaultFilterOptions = createFilterOptions<SelectOption>();
    const persistentOptions = options.filter((option) => option.persistent);
    const standardOptions = options.filter((option) => !option.persistent);
    const filteredOptions: SelectOption[] = defaultFilterOptions(
      standardOptions,
      state
    );
    return [...persistentOptions, ...filteredOptions];
  }

  return (
    <Autocomplete
      id={id}
      value={value}
      multiple={true}
      getOptionLabel={(option: SelectOption) => option.label}
      getOptionSelected={(option: SelectOption, selected: SelectOption) =>
        option.value === selected.value
      }
      renderInput={handleRenderInput}
      filterOptions={filterOptions}
      {...rest}
    />
  );
};
