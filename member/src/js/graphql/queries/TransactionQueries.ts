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

export const PURCHASE = gql`
  query($purchaseId: ID!) {
    purchase(purchaseId: $purchaseId) {
      id
      items {
        id
        price
        amount
        product {
          id
          name
          thumbnail
        }
      }
    }
  }
`;
