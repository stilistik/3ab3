import React from 'react';
import { IconButton } from '@material-ui/core';
import { Icon } from 'Components';

class ImageInput extends React.Component {
  render() {
    return (
      <div>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="image-input"
          type="file"
          onChange={this.props.onChange}
        />
        <label htmlFor="image-input">
          <IconButton component="span">
            <Icon type="camera" />
          </IconButton>
        </label>
      </div>
    );
  }
}

export default ImageInput;
