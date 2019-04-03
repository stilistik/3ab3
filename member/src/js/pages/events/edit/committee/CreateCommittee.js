import React from 'react';
import { connect } from 'react-redux';
import { showMessage } from 'Redux/actions';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import CommitteeForm from './CommitteeForm';

const MUTATION = gql`
  mutation($userId: ID!, $committeeId: ID!) {
    createInvitation(userId: $userId, committeeId: $committeeId) {
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

class CreateCommittee extends React.Component {
  onSubmit = async (users) => {
    try {
      await users.forEach(async (user) => {
        await this.createInvitation({
          variables: {
            userId: user.value,
            committeeId: this.props.committee.id,
          },
        });
      });
    } catch (error) {
      this.props.message({ type: 'error', text: error.message });
      return;
    }
    this.props.message({
      type: 'success',
      text: `Sent ${users.length} invitations!`,
    });
  };

  render() {
    return (
      <Mutation mutation={MUTATION}>
        {(createInvitation) => {
          this.createInvitation = createInvitation;
          return (
            <CommitteeForm
              onSubmit={this.onSubmit}
              committee={this.props.committee}
            />
          );
        }}
      </Mutation>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(CreateCommittee);
