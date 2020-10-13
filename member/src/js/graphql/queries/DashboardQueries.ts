import gql from 'graphql-tag';

export const USERS_WITH_DEBT = gql`
  query($threshold: Int!) {
    usersWithDebt(threshold: $threshold) {
      id
      name
      avatar
      balance
    }
  }
`;

export const GLOBAL_BALANCE_CHART = gql`
  query {
    users {
      id
      balance
    }
    transactions(first: 15) {
      edges {
        node {
          id
          type
          date
          purchase {
            id
            total
          }
          payment {
            id
            amount
          }
        }
      }
    }
  }
`;

export const BALANCE_TABLE = gql`
  query {
    users {
      id
      name
      balance
      transactions(first: 1) {
        edges {
          node {
            id
            date
          }
        }
      }
    }
  }
`;
