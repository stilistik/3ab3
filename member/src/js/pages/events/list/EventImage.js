import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { Icon } from 'Components';

import styles from './EventImage.css';

class EventImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      loading: true,
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
    this.setState({ loading: false });
  };

  render() {
    return (
      <div className={styles.background} ref={(ref) => (this.image = ref)}>
        {this.state.loading ? (
          <div className={styles.indicator}>
            <CircularProgress size={60} className={styles.progress} />
          </div>
        ) : null}
        {this.state.error ? (
          <div className={styles.indicator}>
            <Icon type="camera" className={styles.icon} />
          </div>
        ) : null}
      </div>
    );
  }
}

export default EventImage;
