import gql from 'graphql-tag';

export const DELETE_TRANSACTION = gql`
  mutation($transactionId: ID!) {
    deleteTransaction(transactionId: $transactionId) {
      id
    }
  }
`;
