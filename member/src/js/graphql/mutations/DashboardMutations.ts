import gql from 'graphql-tag';

export const SEND_PAYMENT_REMIDER = gql`
  mutation($userIds: [ID!]!) {
    sendPaymentReminder(userIds: $userIds)
  }
`;
