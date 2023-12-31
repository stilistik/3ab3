import gql from 'graphql-tag';

export const CURRENT_USER_TRANSACTIONS = gql`
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
            change
            debt {
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

export const PURCHASE_RECEIPT = gql`
  query($purchaseId: ID!) {
    purchase(purchaseId: $purchaseId) {
      id
      total
      items {
        id
        product {
          name
          price
        }
        price
        amount
      }
    }
  }
`;
