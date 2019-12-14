import React from 'react';
import ProductForm from '../ProductForm';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { connect } from 'react-redux';
import { Message } from 'Components';
import { PRODUCTS } from '../list/Products';

const MUTATION = gql`
  mutation($productId: ID!, $input: ProductInput!) {
    updateProduct(productId: $productId, input: $input) {
      id
    }
  }
`;

export const EditProductForm = ({ product }) => {
  const [updateProduct] = useMutation(MUTATION);

  const onSubmit = async (values) => {
    const { thumbnail, ...rest } = values;
    console.log(thumbnail);

    try {
      await updateProduct({
        variables: {
          productId: product.id,
          input: { image: thumbnail, ...rest },
        },
        refetchQueries: () => {
          return [{ query: PRODUCTS }];
        },
      });
    } catch (error) {
      Message.error(error.message);
      return;
    }
    Message.success('Product update successful');
  };
  return <ProductForm onSubmit={onSubmit} initValues={product} />;
};

export default EditProductForm;
