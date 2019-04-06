import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { showMessage } from 'Redux/actions';
import TodoForm from './TodoForm';

const MUTATION = gql`
  mutation($input: TodoInput!) {
    createTodo(input: $input) {
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
        refetchQueries: () => this.props.refetch,
      });
    } catch (error) {
      this.props.message({ type: 'error', text: error.message });
    }
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

export default connect(
  null,
  mapDispatchToProps
)(CreateTodo);
