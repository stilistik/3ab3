import React from 'react';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { showMessage } from 'Redux/actions';
import { Mutation } from 'react-apollo';
import { CreateCommentForm } from 'Components';
import { EVENT_COMMENTS } from './EventComments';

const MUTATION = gql`
  mutation($eventId: ID!, $text: String!) {
    commentEvent(eventId: $eventId, text: $text) {
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

class CommentEvent extends React.Component {
  onSubmit = async (values) => {
    try {
      await this.createComment({
        variables: {
          eventId: values.id,
          text: values.text,
        },
        refetchQueries: () => [
          { query: EVENT_COMMENTS, variables: { eventId: values.id } },
        ],
      });
    } catch (error) {
      this.props.message({ type: 'error', text: error.message });
      return;
    }
  };

  render() {
    return (
      <Mutation mutation={MUTATION}>
        {(createComment) => {
          this.createComment = createComment;
          return (
            <CreateCommentForm
              onSubmit={this.onSubmit}
              user={this.props.user}
              id={this.props.event.id}
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
)(CommentEvent);
