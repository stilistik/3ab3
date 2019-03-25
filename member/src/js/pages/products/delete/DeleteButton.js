import React from 'react';
import { IconButton } from '@material-ui/core';
import { Icon, DeleteConfirm } from 'Components';

class DeleteButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };
  }

  onClick = (e) => {
    this.setState({ anchorEl: e.target });
  };

  onCancel = () => {
    this.setState({ anchorEl: null });
  };

  onDelete = () => {
    this.props.onDelete();
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    return (
      <div>
        <IconButton size="small" color="primary" onClick={this.onClick}>
          <Icon type="delete" />
        </IconButton>
        <DeleteConfirm
          anchorEl={anchorEl}
          onCancel={this.onCancel}
          onDelete={this.onDelete}
        />
      </div>
    );
  }
}

export default DeleteButton;
