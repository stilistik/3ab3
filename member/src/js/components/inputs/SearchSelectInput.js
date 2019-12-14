import React from 'react';
import Downshift from 'downshift';
import { Icon } from '../icon';
import {
  Input,
  InputLabel,
  Paper,
  MenuItem,
  InputAdornment,
  Divider,
} from '@material-ui/core';
import classnames from 'classnames';

import styles from './SearchSelectInput.less';

function renderInput(props) {
  const { InputProps, ref, classes, ...rest } = props;
  const cls = classnames(styles.inputRoot, classes.input);
  return (
    <div className={classes.inputContainer}>
      <InputLabel htmlFor={InputProps.id}>{rest.label}</InputLabel>
      <Input
        ref={ref}
        classes={{
          root: cls,
          input: styles.inputInput,
        }}
        {...InputProps}
        inputProps={rest.inputProps}
      />
    </div>
  );
}

function defaultRenderValue(valueItem) {
  if (!valueItem) return null;
  return <span>{valueItem.label}</span>;
}

function defaultRenderSuggestion(suggestionProps) {
  const { suggestion, index, itemProps, highlightedIndex } = suggestionProps;
  const isHighlighted = highlightedIndex === index;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.label}
      selected={isHighlighted}
      component="div"
      className={styles.menuItem}
    >
      {suggestion.icon} {suggestion.label}
    </MenuItem>
  );
}

function filterOptions(options, value) {
  return options.filter((opt) => value !== opt.value);
}

/**
 * Filters the available options for the best matching suggestions based on
 * the current input value.
 * @param {Array} options: The available options of the multi select
 * @param {String} inputValue: The currently typed value in the input
 * @param {Number} suggestionCount: The amount of displayed suggestions
 * @param {Boolean} showEmpty: if the suggestions should be shown on empty inputValue
 */
function getSuggestions(options, inputValue, suggestionCount, showEmpty) {
  const inputLength = inputValue.length;
  let count = 0;

  if (inputLength === 0 && !showEmpty) return [];
  else {
    return options.filter((suggestion) => {
      const keep =
        count < suggestionCount &&
        suggestion.label.toLowerCase().includes(inputValue.toLowerCase());

      if (keep) count += 1;
      return keep;
    });
  }
}

export class SearchSelectInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      menuIsOpen: false,
      highlightedIndex: null,
    };

    this.input = React.createRef();
  }

  handleInputChange = (e) => {
    if (this.props.value) return;
    this.setState({ inputValue: e.target.value, menuIsOpen: true });
  };

  handleInputClick = () => {
    // focus input if value adornment is clicked
    this.input.current.focus();
  };

  handleInputFocus = () => {
    this.setState({ menuIsOpen: true });
  };

  handleKeyDown = (e, suggestions) => {
    const { value, onChange } = this.props;
    const { highlightedIndex } = this.state;
    const { inputValue } = this.state;
    if (e.key === 'Backspace') {
      if (value) {
        onChange(null);
        this.setState({ inputValue: '', menuIsOpen: true });
      }
    }

    if (inputValue.length && e.key === 'Enter') {
      if (highlightedIndex >= 0) {
        const newValue = suggestions[highlightedIndex];
        onChange(newValue);
      }
    }

    if (suggestions.length === 1) this.setState({ highlightedIndex: 0 });
  };

  handleChange = (item) => {
    if (!item) {
      this.setState({ menuIsOpen: false });
      return;
    } else {
      this.props.onChange(item);
      this.setState({ inputValue: '', menuIsOpen: false });
    }
    this.input.current.blur();
  };

  handleDownshiftStateChange = (changes) => {
    this.setState({ highlightedIndex: changes.highlightedIndex });
  };

  render() {
    const {
      id,
      value,
      label,
      options,
      persistentOptions,
      classes,
      disableUnderline,
      renderSuggestion,
      renderValue,
      autoFocus,
    } = this.props;
    const { inputValue, menuIsOpen } = this.state;
    return (
      <Downshift
        inputValue={inputValue}
        onChange={this.handleChange}
        onStateChange={this.handleDownshiftStateChange}
        selectedItem={value}
        itemToString={(item) => (item ? item.label : '')}
      >
        {({ getInputProps, getItemProps, highlightedIndex }) => {
          const candidates = filterOptions(options, value);
          const suggestions = getSuggestions(candidates, inputValue, 5, true);
          const { onBlur, onChange, onKeyDown } = getInputProps({
            onKeyDown: (e) => this.handleKeyDown(e, suggestions),
          });
          return (
            <div className={styles.container}>
              {renderInput({
                fullWidth: true,
                label: label,
                InputProps: {
                  id,
                  value: inputValue,
                  startAdornment: renderValue(value),
                  endAdornment: (
                    <InputAdornment>
                      <Icon
                        type={menuIsOpen ? 'arrowDropUp' : 'arrowDropDown'}
                      />
                    </InputAdornment>
                  ),
                  disableUnderline,
                  autoFocus,
                  onKeyDown: (e) => {
                    onKeyDown(e);
                  },
                  onBlur: (e) => {
                    this.setState({ menuIsOpen: false });
                    onBlur(e);
                  },
                  onChange: (e) => {
                    this.handleInputChange(e);
                    onChange(e);
                  },
                  onFocus: (e) => {
                    this.handleInputFocus(e);
                  },
                  onClick: (e) => {
                    this.handleInputClick(e);
                  },
                },
                inputProps: {
                  ref: this.input,
                },
                classes,
              })}

              {this.state.menuIsOpen ? (
                <Paper
                  className={classnames(styles.paper, classes.paper)}
                  square
                >
                  {persistentOptions.map((opt, index) =>
                    renderSuggestion({
                      suggestion: opt,
                      index,
                      itemProps: getItemProps({ item: opt }),
                      highlightedIndex,
                      selectedItem: value,
                    })
                  )}
                  {persistentOptions.length > 0 && <Divider />}
                  {suggestions.map((suggestion, index) =>
                    renderSuggestion({
                      suggestion,
                      index: index + persistentOptions.length,
                      itemProps: getItemProps({ item: suggestion }),
                      highlightedIndex,
                      selectedItem: value,
                    })
                  )}
                </Paper>
              ) : null}
            </div>
          );
        }}
      </Downshift>
    );
  }
}

SearchSelectInput.defaultProps = {
  label: null,
  disableUnderline: false,
  renderSuggestion: defaultRenderSuggestion,
  renderValue: defaultRenderValue,
  autoFocus: false,
  value: [],
  options: [],
  persistentOptions: [],
  onChange: () => {},
  classes: {
    input: '',
    inputContainer: '',
    paper: '',
  },
};

export default SearchSelectInput;
