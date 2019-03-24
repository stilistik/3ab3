import React from 'react';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { showMessage } from 'Redux/actions';
import { Mutation } from 'react-apollo';
import CreatePostForm from './CreatePostForm';
import { FEED } from '../Feed';

const MUTATION = gql`
  mutation($input: PostInput!) {
    createPost(input: $input) {
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

class CreatePost extends React.Component {
  onSubmit = async (values) => {
    try {
      await this.createPost({
        variables: { input: values },
        refetchQueries: () => [{ query: FEED }],
      });
    } catch (error) {
      this.props.message({ type: 'error', text: error.message });
      return;
    }
  };

  render() {
    return (
      <Mutation mutation={MUTATION}>
        {(createPost) => {
          this.createPost = createPost;
          return <CreatePostForm onSubmit={this.onSubmit} />;
        }}
      </Mutation>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(CreatePost);
