import React from 'react';
import { TextField, Grid, Button } from '@material-ui/core';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { connect } from 'react-redux';
import { showMessage } from 'Redux/actions';

import styles from './AccountForm.css';

const MUTATION = gql`
  mutation($input: EditSelfInput!) {
    editSelf(input: $input) {
      id
    }
  }
`;

const mapDispatchToProps = (dispatch) => {
  return {
    message: (message) => {
      dispatch(showMessage(message));
    },
  };
};

class FormMutation extends React.Component {
  onSubmit = async (values) => {
    try {
      await this.editSelf({
        variables: {
          input: values,
        },
      });
    } catch (error) {
      this.props.message({ type: 'error', text: error.message });
    }
    this.props.message({ type: 'success', text: 'Profile update successful' });
  };

  render() {
    return (
      <Mutation mutation={MUTATION}>
        {(editSelf) => {
          this.editSelf = editSelf;
          return <AccountForm {...this.props} onSubmit={this.onSubmit} />;
        }}
      </Mutation>
    );
  }
}

class AccountForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.user.name,
      email: props.user.email,
      password: '',
    };
  }

  submit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state);
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <Grid container>
        <Grid item xs={12} sm={6}>
          <form className={styles.form} onSubmit={this.submit}>
            <TextField
              name="name"
              label="Name"
              margin="normal"
              value={this.state.name}
              onChange={this.onChange}
            />
            <TextField
              name="email"
              label="Email"
              margin="normal"
              type="email"
              value={this.state.email}
              onChange={this.onChange}
            />
            <TextField
              name="password"
              label="Password"
              margin="normal"
              type="password"
              value={this.state.password}
              onChange={this.onChange}
            />
            <br />
            <Button
              type="submit"
              variant="contained"
              size="large"
              color="primary"
            >
              Submit
            </Button>
          </form>
        </Grid>
      </Grid>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(FormMutation);
