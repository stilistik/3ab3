import gql from 'graphql-tag';

export const CREATE_PRODUCT = gql`
  mutation($input: ProductInput!) {
    createProduct(input: $input) {
      id
    }
  }
`;

export const EDIT_PRODUCT = gql`
  mutation($productId: ID!, $input: ProductInput!) {
    updateProduct(productId: $productId, input: $input) {
      id
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation($productId: ID!) {
    deleteProduct(productId: $productId) {
      id
    }
  }
`;
