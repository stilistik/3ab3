import React from 'react';
import { Typography } from '@material-ui/core';
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
      thumbnail
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
    const { thumbnail, ...rest } = this.props.product;
    const initValues = {
      image: thumbnail,
      ...rest,
    };
    return (
      <DefaultGrid overflow>
        <div className={styles.container}>
          <Typography variant="h3" className={styles.typo}>
            Edit Product
          </Typography>
          <EditProductForm {...this.props} initValues={initValues} />
        </div>
      </DefaultGrid>
    );
  }
}

export default EditProductQuery;
