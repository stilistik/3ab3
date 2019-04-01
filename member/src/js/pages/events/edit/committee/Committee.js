import React from 'react';
import { UserSelector } from 'Components';
import { Paper, Typography, Button } from '@material-ui/core';

class Committee extends React.Component {
  render() {
    return (
      <Paper style={{ padding: '20px' }}>
        <Typography variant="h3">
          Select the members for your committee and send invitations
        </Typography>
        <br />
        <UserSelector isMulti={true} />
        <br />
        <Button variant="contained" color="primary" style={{ width: '100%' }}>
          Invite
        </Button>
      </Paper>
    );
  }
}

export default Committee;
