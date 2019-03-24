import React from 'react';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { showMessage } from 'Redux/actions';
import { Mutation } from 'react-apollo';
import CreateCommentForm from './CreateCommentForm';
import { POST_COMMENTS } from './CommentList';

const MUTATION = gql`
  mutation($input: CommentInput!) {
    createComment(input: $input) {
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

class CreateComment extends React.Component {
  onSubmit = async (values) => {
    try {
      await this.createComment({
        variables: { input: values },
        refetchQueries: () => [
          { query: POST_COMMENTS, variables: { postId: this.props.post.id } },
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
)(CreateComment);