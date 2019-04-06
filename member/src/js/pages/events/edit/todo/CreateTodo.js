import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import TodoForm from './TodoForm';

const MUTATION = gql`
  mutation($input: TodoInput!) {
    createTodo(input: $input) {
      id
    }
  }
`;

class CreateTodo extends React.Component {
  onSubmit = (values) => {
    try {
      this.createTodo({
        variables: {
          input: {
            eventId: this.props.eventId,
            ...values,
          },
        },
      });
    } catch (error) {
      console.log(error);
      return;
    }
    console.log('success');
  };

  render() {
    return (
      <Mutation mutation={MUTATION}>
        {(createTodo) => {
          this.createTodo = createTodo;
          return <TodoForm onSubmit={this.onSubmit} />;
        }}
      </Mutation>
    );
  }
}

export default CreateTodo;
