import gql from 'graphql-tag';

export const TRANSACTIONS = gql`
  query($first: Int!, $skip: Int, $orderBy: String, $where: JSON) {
    transactions(first: $first, skip: $skip, orderBy: $orderBy, where: $where) {
      edges {
        node {
          id
          date
          type
          change
          user {
            id
            name
          }
          nanocredit {
            id
            amount
            description
          }
          payment {
            id
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
