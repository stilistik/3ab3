import React from 'react';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { showMessage } from 'Redux/actions';
import { Mutation } from 'react-apollo';
import { CreateCommentForm, POST_COMMENTS } from 'Components';

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
          { query: POST_COMMENTS, variables: { eventId: values.id } },
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
          return <CreateCommentForm onSubmit={this.onSubmit} {...this.props} />;
        }}
      </Mutation>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(CommentEvent);
