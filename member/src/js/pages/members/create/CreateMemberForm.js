import React from 'react';
import MemberForm from '../MemberForm';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { connect } from 'react-redux';
import { showMessage } from 'Redux/actions';
import { MEMBERS } from '../list/Members';

const MUTATION = gql`
  mutation($input: UserInput!) {
    createUser(input: $input) {
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
      await this.createUser({
        variables: {
          input: values,
        },
        refetchQueries: () => {
          return [{ query: MEMBERS }];
        },
      });
    } catch (error) {
      this.props.message({ type: 'error', text: error.message });
      return;
    }
    this.props.message({ type: 'success', text: 'User successfully created' });
  };

  render() {
    return (
      <Mutation mutation={MUTATION}>
        {(createUser) => {
          this.createUser = createUser;
          return <MemberForm {...this.props} onSubmit={this.onSubmit} />;
        }}
      </Mutation>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(FormMutation);
