import React from 'react';
import { Icon } from 'Components';

import styles from './ProductImage.css';

class ProductImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
    };
  }

  componentDidMount = () => {
    const url = global.API_URL + this.props.thumbnail;
    const img = new Image();
    img.onload = this.onLoad;
    img.onerror = () => this.setState({ error: true });
    img.src = url;
  };

  onLoad = () => {
    this.image.style.backgroundImage = `url(${global.API_URL +
      this.props.thumbnail})`;
  };

  render() {
    return (
      <div className={styles.background} ref={(ref) => (this.image = ref)}>
        {this.state.error ? (
          <div className={styles.error}>
            <Icon type="camera" className={styles.icon} />
          </div>
        ) : null}
      </div>
    );
  }
}

export default ProductImage;
