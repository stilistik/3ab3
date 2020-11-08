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
  mutation($paymentId: ID!, $input: PaymentInput!) {
    editPayment(paymentId: $paymentId, input: $input) {
      id
    }
  }
`;

export const EDIT_PURCHASE = gql`
  mutation($purchaseId: ID!, $input: PurchaseInput!) {
    editPurchase(purchaseId: $purchaseId, input: $input) {
      id
    }
  }
`;
