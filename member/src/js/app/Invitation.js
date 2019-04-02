import React from 'react';
import { Mutation } from 'react-apollo';
import { Button } from '@material-ui/core';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { showMessage } from 'Redux/actions';

import styles from './Invitation.css';

const ACCEPT = gql`
  mutation($invitationId: ID!) {
    acceptInvitation(invitationId: $invitationId) {
      id
    }
  }
`;

const DECLINE = gql`
  mutation($invitationId: ID!) {
    declineInvitation(invitationId: $invitationId) {
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

class Accept extends React.Component {
  onAccept = async () => {
    try {
      await this.accept({
        variables: { invitationId: this.props.invitation.id },
        refetchQueries: () => this.props.refetch,
      });
    } catch (error) {
      this.props.message({ type: 'error', text: error.message });
      return;
    }
    this.props.message({ type: 'success', text: 'Invitation accepted.' });
  };

  render() {
    return (
      <Mutation mutation={ACCEPT}>
        {(accept) => {
          this.accept = accept;
          return (
            <Button
              className={styles.accept}
              size="small"
              variant="contained"
              color="primary"
              onClick={this.onAccept}
            >
              Accept
            </Button>
          );
        }}
      </Mutation>
    );
  }
}

const ConnectedAccept = connect(
  null,
  mapDispatchToProps
)(Accept);

class Decline extends React.Component {
  onDecline = async () => {
    try {
      await this.decline({
        variables: { invitationId: this.props.invitation.id },
        refetchQueries: () => this.props.refetch,
      });
    } catch (error) {
      this.props.message({ type: 'error', text: error.message });
      return;
    }
    this.props.message({ type: 'success', text: 'Invitation declined.' });
  };

  render() {
    return (
      <Mutation mutation={DECLINE}>
        {(decline) => {
          this.decline = decline;
          return (
            <Button
              className={styles.decline}
              size="small"
              variant="contained"
              color="primary"
              onClick={this.onDecline}
            >
              Decline
            </Button>
          );
        }}
      </Mutation>
    );
  }
}

const ConnectedDecline = connect(
  null,
  mapDispatchToProps
)(Decline);

class Invitation extends React.Component {
  render() {
    const event = this.props.invitation.committee.event;
    return (
      <div className={styles.invitation}>
        <p className={styles.text}>Committee Invitation: {event.title}</p>
        <ConnectedAccept {...this.props} />
        <ConnectedDecline {...this.props} />
      </div>
    );
  }
}

export default Invitation;
