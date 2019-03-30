import React from 'react';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { showMessage } from 'Redux/actions';
import { Mutation } from 'react-apollo';
import { CreateCommentForm } from 'Components';
import { POST_COMMENTS } from './PostComments';

const MUTATION = gql`
  mutation($postId: ID!, $text: String!) {
    commentPost(postId: $postId, text: $text) {
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

class CommentPost extends React.Component {
  onSubmit = async (values) => {
    try {
      await this.createComment({
        variables: {
          postId: values.id,
          text: values.text,
        },
        refetchQueries: () => [
          { query: POST_COMMENTS, variables: { postId: values.id } },
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
              id={this.props.post.id}
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
)(CommentPost);