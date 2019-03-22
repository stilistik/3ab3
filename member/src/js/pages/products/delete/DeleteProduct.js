import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { showMessage } from 'Redux/actions';
import DeleteButton from './DeleteButton';

const UPDATE_QUERY = gql`
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

const MUTATION = gql`
  mutation($productId: ID!) {
    deleteProduct(productId: $productId) {
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

class DeleteProduct extends React.Component {
  onDelete = async () => {
    try {
      await this.deleteProduct({
        variables: { productId: this.props.product.id },
        refetchQueries: () => [{ query: UPDATE_QUERY }],
      });
    } catch (error) {
      this.props.message({ type: 'error', text: error.message });
      return;
    }
    this.props.message({
      type: 'success',
      text: 'Product successfully deleted',
    });
  };
  render() {
    return (
      <Mutation mutation={MUTATION}>
        {(deleteProduct) => {
          this.deleteProduct = deleteProduct;
          return <DeleteButton onDelete={this.onDelete} />;
        }}
      </Mutation>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(DeleteProduct);
