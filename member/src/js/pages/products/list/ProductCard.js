import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  CardActionArea,
  IconButton,
  Typography,
} from '@material-ui/core';
import { Icon, ImageContainer } from 'Components';
import DeleteProduct from '../delete/DeleteProduct';
import { getBackendUrl } from 'Apollo/Utils';

import styles from './ProductCard.css';

class ProductCard extends React.Component {
  onEdit = () => {
    this.props.onEdit(this.props.product.id);
  };

  onDelete = () => {
    this.props.onDelete(this.props.product.id);
  };

  render() {
    return (
      <Card>
        <CardActionArea className={styles.area} onClick={this.onEdit}>
          <ImageContainer
            image={getBackendUrl() + this.props.product.thumbnail}
            classes={{
              root: styles.image,
              progress: styles.progress,
              icon: styles.icon,
              indicator: styles.indicator,
            }}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className={styles.typo}
            >
              {this.props.product.name}
            </Typography>
            <Typography component="p" className={styles.typo}>
              Price: {this.props.product.price.toFixed(2)} CHF
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <IconButton size="small" color="primary" onClick={this.onEdit}>
            <Icon type="edit" />
          </IconButton>
          <DeleteProduct {...this.props} />
        </CardActions>
      </Card>
    );
  }
}

export default ProductCard;
