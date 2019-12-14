import React from 'react';
import ProductForm from '../ProductForm';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { connect } from 'react-redux';
import { Message } from 'Components';
import { PRODUCTS } from '../list/Products';

const MUTATION = gql`
  mutation($input: ProductInput!) {
    createProduct(input: $input) {
      id
    }
  }
`;

const CreateProductForm = (props) => {
  const [createProduct] = useMutation(MUTATION);

  const onSubmit = async (values) => {
    const { thumbnail, ...rest } = values;
    try {
      await createProduct({
        variables: {
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
  return <ProductForm {...props} onSubmit={onSubmit} />;
};

export default CreateProductForm;
