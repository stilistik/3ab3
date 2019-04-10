import React from 'react';
import ProductForm from '../ProductForm';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { connect } from 'react-redux';
import { showMessage } from 'Redux/actions';
import { PRODUCTS } from '../list/Products';

const MUTATION = gql`
  mutation($productId: ID!, $input: ProductInput!) {
    updateProduct(productId: $productId, input: $input) {
      id
    }
  }
`;

const mapDispatchToProps = (dispatch) => {
  return {
    message: (message) => {
      dispatch(showMessage(message));
    },
  };
};

class FormMutation extends React.Component {
  onSubmit = async (values) => {
    console.log(values);

    try {
      await this.updateProduct({
        variables: {
          productId: this.props.product.id,
          input: values,
        },
        refetchQueries: () => {
          return [{ query: PRODUCTS }];
        },
      });
    } catch (error) {
      this.props.message({ type: 'error', text: error.message });
      return;
    }
    this.props.message({ type: 'success', text: 'Product update successful' });
  };

  render() {
    return (
      <Mutation mutation={MUTATION}>
        {(updateProduct) => {
          this.updateProduct = updateProduct;
          return (
            <ProductForm
              {...this.props}
              onSubmit={this.onSubmit}
              initValues={this.props.initValues}
            />
          );
        }}
      </Mutation>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(FormMutation);
