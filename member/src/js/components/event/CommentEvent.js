import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { CreateCommentForm, Message } from 'Components';

const MUTATION = gql`
  mutation($eventId: ID!, $text: String!, $link: String) {
    commentEvent(eventId: $eventId, text: $text, link: $link) {
      id
    }
  }
`;

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
      Message.error(error.message);
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

export default CommentEvent;
