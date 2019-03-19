import React from 'react';
import { DefaultGrid } from 'Components';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { getQueryParams } from 'History';
import EditProductForm from './EditProductForm';

import styles from './EditProduct.css';

const QUERY = gql`
  query($productId: ID!) {
    product(productId: $productId) {
      id
      name
      price
      index
    }
  }
`;

class EditProductQuery extends React.Component {
  render() {
    const { id } = getQueryParams();
    return (
      <Query query={QUERY} variables={{ productId: id }}>
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return null;
          return <EditProduct product={data.product} />;
        }}
      </Query>
    );
  }
}

class EditProduct extends React.Component {
  render() {
    return (
      <DefaultGrid overflow>
        <div className={styles.container}>
          <EditProductForm {...this.props} />
        </div>
      </DefaultGrid>
    );
  }
}

export default EditProductQuery;
