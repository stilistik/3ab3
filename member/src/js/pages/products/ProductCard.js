import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  CardActionArea,
  IconButton,
  Typography,
} from '@material-ui/core';
import { Icon } from 'Components';

import styles from './ProductCard.css';

class ProductCard extends React.Component {
  render() {
    return (
      <Card>
        <CardActionArea className={styles.area}>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            image="http://www.felsenau.ch/cgi-bin/xcms/navibild/25/Header_Junker.jpg"
            title="Contemplative Reptile"
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
          <IconButton size="small" color="primary">
            <Icon type="edit" />
          </IconButton>
          <IconButton size="small" color="primary">
            <Icon type="delete" />
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}

export default ProductCard;
