import React from 'react';
import { Input, Chip } from '@material-ui/core';

import styles from './TagInput.less';

/**
 * The default render function renders the array of values as materialUI
 * chips. This function is passed with the defaultProps and can be replaced
 * by the renderAdornment prop.
 * @param {Object} item: An item from the value array (current selection)
 * @param {*} handleDelete: A function callback if delete is called on an element
 * @returns {React.Component}: The visual representation of a value item.
 */
function defaultAdornment(item, handleDelete) {
  return (
    <Chip
      key={item}
      tabIndex={-1}
      label={
        <div className={styles.chipLabel}>
          <span>{item}</span>
        </div>
      }
      className={styles.chip}
      onDelete={handleDelete(item)}
    />
  );
}

export class TagInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value, menuIsOpen: true });
  };

  handleInputBlur = () => {
    const { onChange, value } = this.props;
    const { inputValue } = this.state;
    if (inputValue.length && !value.includes(inputValue)) {
      const newvalue = [...value, inputValue];
      onChange(newvalue);
      this.setState({ inputValue: '' });
    }
  };

  handleKeyDown = (e) => {
    const { onChange, value } = this.props;
    const { inputValue } = this.state;
    if (value.length && !inputValue.length && e.key === 'Backspace') {
      onChange(value.slice(0, value.length - 1));
    }
    if (inputValue.length && e.key === 'Enter' && !value.includes(inputValue)) {
      const newvalue = [...value, inputValue];
      onChange(newvalue);
      this.setState({ inputValue: '' });
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

  handleDelete = (item) => () => {
    const { onChange, value } = this.props;
    const newSelectedItem = [...value];
    newSelectedItem.splice(newSelectedItem.indexOf(item), 1);
    onChange(newSelectedItem);
  };

  render() {
    const { id, value, renderAdornment } = this.props;
    const { inputValue } = this.state;

    const adornment = value.length
      ? value.map((item) => renderAdornment(item, this.handleDelete))
      : null;
    return (
      <Input
        id={id}
        value={inputValue}
        classes={{
          root: styles.inputRoot,
          input: styles.inputInput,
        }}
        startAdornment={adornment}
        onChange={this.handleInputChange}
        onKeyDown={this.handleKeyDown}
        onBlur={this.handleInputBlur}
      />
    );
  }
}

TagInput.defaultProps = {
  placeholder: 'Placeholder',
  label: null,
  disableUnderline: false,
  autoFocus: false,
  value: [],
  onChange: () => {},
  renderAdornment: defaultAdornment,
  classes: {
    input: '',
    inputContainer: '',
    paper: '',
  },
};

export default TagInput;
