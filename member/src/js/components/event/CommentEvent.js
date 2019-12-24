import React from 'react';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { showMessage } from 'Redux/actions';
import { Mutation } from 'react-apollo';
import { CreateCommentForm } from 'Components';

const MUTATION = gql`
  mutation($eventId: ID!, $text: String!, $link: String) {
    commentEvent(eventId: $eventId, text: $text, link: $link) {
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
          link: values.link,
        },
        refetchQueries: () => this.props.refetch,
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
              id={this.props.eventId}
            />
          );
        }}
      </Mutation>
    );
  }
}

export default connect(null, mapDispatchToProps)(CommentEvent);
