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

type SearchSelectAutocompleteProps = AutocompleteProps<SelectOption, false, false, false>;

export type SearchSelectInputProps = Omit<SearchSelectAutocompleteProps, 'renderInput'> & {
  id?: string;
  label: React.ReactNode;
  renderInput?: (params: AutocompleteRenderInputParams, value: SelectOption) => React.ReactNode;
};

export const SearchSelectInput: React.FC<SearchSelectInputProps> = ({ id, label, value, renderInput, ...rest }) => {
  /**
   * Implements a default renderInput behavior
   */
  function handleRenderInput(params: AutocompleteRenderInputParams) {
    if (renderInput) return renderInput(params, value);
    else return <TextField {...params} label={label} />;
  }

  /**
   * Enhances the default option filtering algorithm of Autocomplete. Makes persistent
   * options always render at the top of the list
   */
  function filterOptions(options: SelectOption[], state: FilterOptionsState<SelectOption>): SelectOption[] {
    const defaultFilterOptions = createFilterOptions<SelectOption>();
    const persistentOptions = options.filter((option) => option.persistent);
    const standardOptions = options.filter((option) => !option.persistent);
    const filteredOptions: SelectOption[] = defaultFilterOptions(standardOptions, state);
    return [...persistentOptions, ...filteredOptions];
  }

  return (
    <Autocomplete
      id={id}
      value={value}
      getOptionLabel={(option: SelectOption) => option.label}
      getOptionSelected={(option: SelectOption, selected: SelectOption) => option.value === selected.value}
      renderInput={handleRenderInput}
      filterOptions={filterOptions}
      {...rest}
    />
  );
};
