import React from 'react';
import { Paper, Typography, Button } from '@material-ui/core';
import { Form, TagField } from 'Components';

import styles from './CommitteeForm.css';

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

  onSubmit = (values) => {
    this.props.onSubmit(values.users);
  };

  render() {
    const { options } = this.props;
    return (
      <Paper style={{ padding: '20px' }}>
        <Typography variant="h3">
          Select the members for your committee and send invitations
        </Typography>
        <br />
        <Form onSubmit={this.onSubmit}>
          <TagField
            id="users"
            name="Users"
            options={options}
            required={true}
            className={styles.field}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className={styles.field}
          >
            Invite
          </Button>
        </Form>
      </Paper>
    );
  }
}

export default CommitteeForm;
