import React from 'react';
import Downshift from 'downshift';
import { Icon } from '../icon';
import {
  Input,
  InputLabel,
  Paper,
  MenuItem,
  Chip,
  InputAdornment,
} from '@material-ui/core';
import classnames from 'classnames';

import styles from './MultiSelectInput.less';

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

function defaultRenderSuggestion(suggestionProps) {
  const {
    suggestion,
    index,
    itemProps,
    highlightedIndex,
    selectedItem,
  } = suggestionProps;
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.value}
      selected={isHighlighted}
      component="div"
      className={styles.menuItem}
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
    >
      {suggestion.icon && <Icon type={suggestion.icon} />}
      {suggestion.label}
    </MenuItem>
  );
}

function filterOptions(options, value) {
  return options.filter((opt) => !value.find((el) => el.value === opt.value));
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

  return inputLength === 0 && !showEmpty
    ? []
    : options.filter((suggestion) => {
        const keep =
          count < suggestionCount &&
          suggestion.label.toLowerCase().includes(inputValue.toLowerCase());

        if (keep) {
          count += 1;
        }

        return keep;
      });
}

/**
 * The default render function renders the array of values as materialUI
 * chips. This function is passed with the defaultProps and can be replaced
 * by the renderAdornment prop.
 * @param {Object} item: An item from the value array (current selection)
 * @param {*} handleDelete: A function callback if delete is called on an element
 * @returns {React.Component}: The visual representation of a value item.
 */
function defaultRenderValue(value, handleDelete) {
  if (!value.length) return null;
  return value.map((item) => (
    <Chip
      key={item.value}
      tabIndex={-1}
      label={
        <div className={styles.chipLabel}>
          {item.icon && <Icon type={item.icon} />}
          <span>{item.label}</span>
        </div>
      }
      className={styles.chip}
      onDelete={() => {
        handleDelete(item);
      }}
    />
  ));
}

export class MultiSelectInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      menuIsOpen: false,
      highlightedIndex: null,
    };

    this.input = React.createRef();
  }

  handleInputClick = () => {
    // focus input if value adornment is clicked
    this.input.current.focus();
  };

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value, menuIsOpen: true });
  };

  handleInputFocus = () => {
    this.setState({ menuIsOpen: true });
  };

  handleKeyDown = (e, suggestions) => {
    const { onChange, onCommit, value } = this.props;
    const { highlightedIndex } = this.state;
    const { inputValue } = this.state;
    if (value.length && !inputValue.length && e.key === 'Backspace') {
      onChange(value.slice(0, value.length - 1));
    }
    if (inputValue.length && e.key === 'Enter') {
      if (highlightedIndex >= 0) {
        const newvalue = [...value, suggestions[highlightedIndex]];
        onChange(newvalue);
      } else {
        if (onCommit) onCommit(inputValue);
        this.setState({ inputValue: '' });
      }
    }
  };

  handleChange = (item) => {
    const { onChange, value } = this.props;
    if (!item) {
      this.setState({ inputValue: '', menuIsOpen: false });
      return;
    } else {
      let newSelectedItem = [...value];
      if (newSelectedItem.indexOf(item) === -1) {
        newSelectedItem = [...newSelectedItem, item];
      }
      this.setState({ inputValue: '' });
      onChange(newSelectedItem);
    }
  };

  handleDelete = (item) => {
    const { onChange, value } = this.props;
    const newSelectedItem = [...value];
    newSelectedItem.splice(newSelectedItem.indexOf(item), 1);
    onChange(newSelectedItem);
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
      renderValue,
      renderSuggestion,
      classes,
      disableUnderline,
      autoFocus,
    } = this.props;
    const { inputValue, menuIsOpen } = this.state;
    return (
      <Downshift
        inputValue={inputValue}
        onChange={this.handleChange}
        onStateChange={this.handleDownshiftStateChange}
        selectedItem={value}
        itemToString={(item) => item.label}
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
                  startAdornment: renderValue(value, this.handleDelete),
                  endAdornment: (
                    <InputAdornment>
                      <Icon
                        type={menuIsOpen ? 'arrowDropUp' : 'arrowDropDown'}
                      />
                    </InputAdornment>
                  ),
                  value: inputValue,
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
                  {suggestions.map((suggestion, index) =>
                    renderSuggestion({
                      suggestion,
                      index,
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

MultiSelectInput.defaultProps = {
  label: null,
  disableUnderline: false,
  autoFocus: false,
  value: [],
  options: [],
  onChange: () => {},
  renderValue: defaultRenderValue,
  renderSuggestion: defaultRenderSuggestion,
  classes: {
    input: '',
    inputContainer: '',
    paper: '',
  },
};

export default MultiSelectInput;
