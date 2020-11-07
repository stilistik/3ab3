import gql from 'graphql-tag';

export const TRANSACTIONS = gql`
  query($first: Int!, $skip: Int, $orderBy: String) {
    transactions(first: $first, skip: $skip, orderBy: $orderBy) {
      edges {
        node {
          id
          date
          type
          change
          user {
            name
          }
          nanocredit {
            amount
            description
          }
          payment {
            amount
          }
          purchase {
            id
            total
          }
        }
      }
    }
  }
`;
