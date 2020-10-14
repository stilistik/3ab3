import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { CreateCommentForm, Message } from 'Components';

const MUTATION = gql`
  mutation($postId: ID!, $text: String!, $link: String) {
    commentPost(postId: $postId, text: $text, link: $link) {
      id
    }
  }
`;

class CommentPost extends React.Component {
  onSubmit = async (values) => {
    try {
      await this.createComment({
        variables: {
          postId: values.id,
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
              id={this.props.postId}
            />
          );
        }}
      </Mutation>
    );
  }
}

export default CommentPost;
