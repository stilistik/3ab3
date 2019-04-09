import React from 'react';
import { connect } from 'react-redux';
import { showMessage } from 'Redux/actions';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import CommitteeForm from './CommitteeForm';
import AvailableUsers from './AvailableUsers';

const MUTATION = gql`
  mutation($userIds: [ID!]!, $committeeId: ID!) {
    createInvitations(userIds: $userIds, committeeId: $committeeId) {
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
      const userIds = users.map((user) => user.value);
      await this.createInvitation({
        variables: {
          userIds: userIds,
          committeeId: this.props.committee.id,
        },
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
            <AvailableUsers {...this.props}>
              <CommitteeForm
                onSubmit={this.onSubmit}
                committee={this.props.committee}
              />
            </AvailableUsers>
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
