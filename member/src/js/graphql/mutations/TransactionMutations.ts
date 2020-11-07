import gql from 'graphql-tag';

export const DELETE_TRANSACTION = gql`
  mutation($transactionId: ID!) {
    deleteTransaction(transactionId: $transactionId) {
      id
    }
  }
`;

export const EDIT_NANOCREDIT = gql`
  mutation($userId: ID!, $nanoCreditId: ID!, $input: NanoCreditInput!) {
    editNanoCredit(
      userId: $userId
      nanoCreditId: $nanoCreditId
      input: $input
    ) {
      id
    }
  }
`;

export const EDIT_PAYMENT = gql`
  mutation($userId: ID!, $input: PaymentInput!) {
    editPayment(userId: $userId, input: $input) {
      id
    }
  }
`;
