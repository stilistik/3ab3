import gql from 'graphql-tag';

export const CREATE_NANOCREDIT = gql`
  mutation($input: NanoCreditInput!) {
    createNanoCredit(input: $input) {
      id
    }
  }
`;
