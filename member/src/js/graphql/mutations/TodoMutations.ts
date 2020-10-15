import gql from 'graphql-tag';

export const CREATE_TODO = gql`
  mutation($input: TodoInput!) {
    createTodo(input: $input) {
      id
    }
  }
`;

export const DELETE_TODO = gql`
  mutation($todoId: ID!) {
    deleteTodo(todoId: $todoId) {
      id
    }
  }
`;

export const CHECK_TODO = gql`
  mutation($todoId: ID!) {
    checkTodo(todoId: $todoId) {
      id
    }
  }
`;

export const UNCHECK_TODO = gql`
  mutation($todoId: ID!) {
    uncheckTodo(todoId: $todoId) {
      id
    }
  }
`;

export const ASSIGN_USER = gql`
  mutation($userId: ID!, $todoId: ID!) {
    assignUser(userId: $userId, todoId: $todoId) {
      id
    }
  }
`;
