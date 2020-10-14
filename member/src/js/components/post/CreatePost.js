import React from 'react';
import gql from 'graphql-tag';
import { Message } from 'Components';
import { Mutation } from 'react-apollo';
import CreatePostForm from './CreatePostForm';

const MUTATION = gql`
  mutation($input: PostInput!) {
    createPost(input: $input) {
      id
    }
  }
`;


class CreatePost extends React.Component {
  onSubmit = async (values) => {
    try {
      await this.createPost({
        variables: { input: values },
      });
      await this.props.refetch();
    } catch (error) {
      Message.error(error.message);
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

export default CreatePost;
