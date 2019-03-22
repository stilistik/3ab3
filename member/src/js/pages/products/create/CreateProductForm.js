import React from 'react';
import ProductForm from '../ProductForm';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { connect } from 'react-redux';
import { showMessage } from 'Redux/actions';

const UPDATE_QUERY = gql`
  query {
    products {
      id
      name
      price
      index
    }
  }
`;

const MUTATION = gql`
  mutation($input: ProductInput!) {
    createProduct(input: $input) {
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
      await this.createProduct({
        variables: {
          input: values,
        },
        refetchQueries: () => {
          return [{ query: UPDATE_QUERY }];
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
        {(createProduct) => {
          this.createProduct = createProduct;
          return <ProductForm {...this.props} onSubmit={this.onSubmit} />;
        }}
      </Mutation>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(FormMutation);
