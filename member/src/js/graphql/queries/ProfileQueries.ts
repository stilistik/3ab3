import gql from 'graphql-tag';

export const TRANSACTIONS = gql`
  query($first: Int!, $skip: Int) {
    currentUser {
      id
      transactionCount
      transactions(first: $first, skip: $skip) {
        edges {
          node {
            id
            date
            type
            nanocredit {
              amount
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
  }
`;

export const BALANCE_CHART = gql`
  query {
    currentUser {
      id
      balance
      transactions(first: 5) {
        edges {
          node {
            id
            date
            change
          }
        }
      }
    }
  }
`;
