import gql from 'graphql-tag';

export const PRODUCT_LIST = gql`
  query {
    products {
      id
      name
      price
      index
      thumbnail
    }
  }
`;
