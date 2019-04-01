import React from 'react';
import { UserSelector } from 'Components';
import { Paper, Typography, Button } from '@material-ui/core';

class CommitteeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  onChange = (value) => {
    this.setState({ value });
  };

  onSubmit = () => {
    this.props.onSubmit(this.state.value);
    this.setState({ value: null });
  };

  render() {
    return (
      <Paper style={{ padding: '20px' }}>
        <Typography variant="h3">
          Select the members for your committee and send invitations
        </Typography>
        <br />
        <UserSelector
          isMulti={true}
          value={this.state.value}
          onChange={this.onChange}
        />
        <br />
        <Button
          variant="contained"
          color="primary"
          style={{ width: '100%' }}
          onClick={this.onSubmit}
        >
          Invite
        </Button>
      </Paper>
    );
  }
}

export default CommitteeForm;
